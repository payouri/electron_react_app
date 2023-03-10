import { IpcMainEvent } from 'electron';
import { getMainWindow } from '../../mainWindow';
import { CROSS_WINDOW_CHANNEL } from '../../router/constants';
import { getSecondaryWindow } from '../../secondary';
import { isSecondaryWindowType } from '../../secondary/helpers/isSecondaryWindowType';
import { createTimeout } from '../../utils/Timeout';
import { isMainWindowType } from './helpers/isMainWindowType';
import { isValidCrossWindowMessage } from './helpers/isValidCrossWindowMessage';
import { MessageType } from './types';

const pendingRequests = new Map<
  string,
  { request: IpcMainEvent; timeout: ReturnType<typeof createTimeout> }
>();

export const MessageBridgeHandler = async (
  ipcEvent: Electron.IpcMainEvent,
  messages: unknown[]
) => {
  const [message] = messages;
  if (!isValidCrossWindowMessage(message)) {
    console.warn('Unknown IPC message type', message);
    ipcEvent.reply(CROSS_WINDOW_CHANNEL, {
      type: MessageType.ERROR,
      error: {
        reason: 'Unknown IPC message type',
        code: 'TIMEOUT',
      },
    });
    return;
  }

  if (message.type === MessageType.REQUEST) {
    const timeout = createTimeout({
      timeoutMS: 5000,
      onTimeout: () => {
        if (message.noTimeout) return;

        pendingRequests.delete(message.requestId);
        ipcEvent.reply(CROSS_WINDOW_CHANNEL, {
          type: MessageType.RESPONSE,
          requestId: message.requestId,
          hasFailed: true,
          error: {
            reason: 'Request timed out',
            code: 'TIMEOUT',
          },
        });
      },
    });

    pendingRequests.set(message.requestId, {
      timeout,
      request: ipcEvent,
    });

    if (isSecondaryWindowType(message.recipientType)) {
      const browser = await getSecondaryWindow(message.recipientType);

      const url = browser.webContents.getURL();

      if (!url) {
        const requestPending = pendingRequests.get(message.requestId)!;
        pendingRequests.delete(message.requestId);
        requestPending.timeout.clear();

        ipcEvent.reply(CROSS_WINDOW_CHANNEL, {
          type: MessageType.ERROR,
          requestId: message.requestId,
          hasFailed: true,
          error: {
            reason: 'Browser window is not ready, it has no URL',
            code: 'MISSING_URL',
          },
        });

        return;
      }

      browser.webContents.send(CROSS_WINDOW_CHANNEL, message);
    } else if (isMainWindowType(message.recipientType)) {
      getMainWindow()?.webContents.send(CROSS_WINDOW_CHANNEL, message);
    }
  }

  if (
    message.type === MessageType.RESPONSE &&
    pendingRequests.has(message.requestId)
  ) {
    const requestPending = pendingRequests.get(message.requestId)!;

    pendingRequests.delete(message.requestId);
    requestPending.timeout.clear();
    requestPending.request.reply(CROSS_WINDOW_CHANNEL, message);
  }
};
