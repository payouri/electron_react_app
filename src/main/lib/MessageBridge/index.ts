import { IpcMainEvent } from 'electron';
import { CROSS_WINDOW_CHANNEL } from '../../router/constants';
import { getSecondaryWindow, SecondaryWindowType } from '../../secondary';
import { createTimeout } from '../../utils/Timeout';
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
    ipcEvent.reply(CROSS_WINDOW_CHANNEL, {
      type: MessageType.ERROR,
      error: {
        message: 'Request timed out',
        code: 'TIMEOUT',
      },
    });
    return;
  }

  if (message.type === MessageType.REQUEST) {
    const timeout = createTimeout({
      timeoutMS: 5000,
      onTimeout: () => {
        pendingRequests.delete(message.requestId);
        ipcEvent.reply(CROSS_WINDOW_CHANNEL, {
          type: MessageType.RESPONSE,
          requestId: message.requestId,
          hasFailed: true,
          error: {
            message: 'Request timed out',
            code: 'TIMEOUT',
          },
        });
      },
    });

    pendingRequests.set(message.requestId, {
      timeout,
      request: ipcEvent,
    });

    (await getSecondaryWindow(SecondaryWindowType.DEFAULT)).webContents.send(
      CROSS_WINDOW_CHANNEL,
      message
    );
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
