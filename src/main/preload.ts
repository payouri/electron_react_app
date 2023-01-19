import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { nanoid } from 'nanoid';
import { initInjectedApps } from './injectApps';
import { IPCChannel } from './router';

let ports = new Set<MessagePort>();

const windowLoaded = new Promise((resolve) => {
  window.onload = resolve;
});

ipcRenderer.on('message-bridge', async (event) => {
  await windowLoaded;
  if (!ports.size) {
    event.ports.forEach((port) => {
      ports.add(port);
    });
  }
  console.log({
    ports: ports.size,
  });
  window.postMessage('message-bridge', '*', [...ports]);
});

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
  ports,
  nanoid,
});
