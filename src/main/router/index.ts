import { IPC_ROUTER_CHANNEL, IPC_SCRIPTS_CHANNEL } from './constants';
import { isKnownIPCMessageType } from './helpers/isKnownIPCMessageType';
import { Routes } from './routes';
import { MessageBridgeHandler } from './routes/bridge';

export * from './types';
export * from './constants';

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

  // ipcEvent.reply(IPC_SCRIPTS_CHANNEL, {
  //   requestId: message.requestId,
  //   type: message.type,
  //   payload: result,
  // });
};

export const IPCCrossWindowRouter = MessageBridgeHandler;
