import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { nanoid } from 'nanoid';
import { initInjectedApps } from './injectApps';
import { RecipientResponse, SenderMessage } from './lib/MessageBridge/types';
import { CROSS_WINDOW_CHANNEL } from './router/constants';
import { IPCChannel } from './router/types';

contextBridge.exposeInMainWorld('electron', {
  initInjectedApps,
  ipcRenderer: {
    sendMessage(channel: IPCChannel, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    sendCrossWindowRequest(
      arg: SenderMessage<string, unknown>
    ): Promise<RecipientResponse<unknown>> {
      const promise = new Promise<RecipientResponse<unknown>>((resolve) => {
        const handler = (
          _event: IpcRendererEvent,
          response: /* RecipientResponse<unknown> */ any
        ) => {
          if (response.requestId === arg.requestId) {
            ipcRenderer.removeListener(CROSS_WINDOW_CHANNEL, handler);
            resolve(response);
          }
        };
        ipcRenderer.on(CROSS_WINDOW_CHANNEL, handler);
      });
      ipcRenderer.send(CROSS_WINDOW_CHANNEL, [arg]);
      return promise;
    },
    sendCrossWindowResponse(arg: RecipientResponse<unknown>): void {
      ipcRenderer.send(CROSS_WINDOW_CHANNEL, [arg]);
    },
    on(channel: IPCChannel, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: IPCChannel, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  nanoid,
});
