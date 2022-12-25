import { IPC_ROUTER_CHANNEL } from './constants';
import { isKnownIPCMessageType } from './helpers/isKnownIPCMessageType';
import { Routes } from './routes';

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
