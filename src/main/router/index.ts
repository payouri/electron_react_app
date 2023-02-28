import { BrowserWindow } from 'electron';
import { getSecondaryWindow, SecondaryWindowType } from '../secondary';
import {
  IPC_ROUTER_CHANNEL,
  IPC_SCRIPTS_CHANNEL,
  IPC_SCRIPTS_RESPONSE_CHANNEL,
} from './constants';
import { isKnownIPCMessageType } from './helpers/isKnownIPCMessageType';
import { Routes } from './routes';
import { MessageBridgeHandler } from './routes/bridge';

export * from './constants';
export * from './types';
export { Routes as IPCRoutes };

export const IPCRouter = async (
  ipcEvent: Electron.IpcMainEvent,
  messages: unknown[]
) => {
  const [message] = messages;
  if (!isKnownIPCMessageType(message)) {
    console.warn('Unknown IPC message type', message);
    return;
  }

  const result = await Routes[message.type](message.payload);

  ipcEvent.reply(IPC_ROUTER_CHANNEL, {
    requestId: message.requestId,
    type: message.type,
    payload: result,
  });
};

export const IPCScriptsRouter = async (
  ipcEvent: Electron.IpcMainEvent,
  messages: unknown[]
) => {
  console.log('IPCScriptsRouter', messages);

  const [message] = messages;

  (await getSecondaryWindow(SecondaryWindowType.BROWSER)).webContents.send(
    IPC_SCRIPTS_CHANNEL,
    message
  );
};

export const buildIPCScriptsRouterResponse =
  (getMainWindow: () => BrowserWindow | null) =>
  async (ipcEvent: Electron.IpcMainEvent, messages: unknown[] | unknown) => {
    console.log('IPCScriptsRouterResponse', messages);

    const mainWindow = getMainWindow();

    if (!mainWindow) {
      return;
    }

    mainWindow.webContents.send(
      IPC_SCRIPTS_RESPONSE_CHANNEL,
      ...(!Array.isArray(messages) ? [messages] : messages)
    );
  };

export const IPCCrossWindowRouter = MessageBridgeHandler;
