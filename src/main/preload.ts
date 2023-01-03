import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { nanoid } from 'nanoid';
import { initInjectedApps } from './injectApps';
import { IPCChannel } from './router';

contextBridge.exposeInMainWorld('electron', {
  initInjectedApps,
  ipcRenderer: {
    sendMessage(channel: IPCChannel, args: unknown[]) {
      ipcRenderer.send(channel, args);
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
