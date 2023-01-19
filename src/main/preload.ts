import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { nanoid } from 'nanoid';
import { initInjectedApps } from './injectApps';
import { IPCChannel } from './router';

// Nous devons attendre que le monde principal soit prêt à recevoir le message avant
// d'envoyer le port. Nous créons cette promesse dans le préchargement afin de garantir que
// l'écouteur du onload soit enregistré avant que l'événement load ne soit déclenché.
const windowLoaded = new Promise((resolve) => {
  window.onload = resolve;
});

ipcRenderer.on('message-bridge', async (event) => {
  await windowLoaded;
  // On utilise un window.postMessage normal pour transferrer le port du monde isolé
  // vers le monde principal.
  console.log(event.ports);
  window.postMessage('message-bridge', '*', event.ports);
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
  nanoid,
});
