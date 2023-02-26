import { ipcRenderer } from 'electron';
import { initRootPageNode } from './helpers/initRootPageNode';
import { getInjectedAppsIPCRoutes } from './router';
import { isValidInjectedAppsMessage } from './router/helpers/isValidInjectedAppsMessage';
import { InjectedAppsMessageType } from './router/types';

const checkInterval = () =>
  setInterval(() => {
    console.log('checkInterval', document.readyState);
  }, 5000);

export const initInjectedApps = () => {
  const pageNode = initRootPageNode();

  const microAppMountNode = document.createElement('div');
  document.body.prepend(microAppMountNode);

  const InjectedAppsIPCRoutes = getInjectedAppsIPCRoutes({
    microAppMountNode,
    pageNode,
  });

  const listener = async (...messages: unknown[]) => {
    console.log('IPC_SCRIPTS_CHANNEL', messages);
    const [message] = messages;

    if (!isValidInjectedAppsMessage(message)) {
      console.warn('Unknown IPC message type', message);
      return;
    }

    await InjectedAppsIPCRoutes[message.type](message.payload);
  };

  ipcRenderer.on('IPC_SCRIPTS_CHANNEL', listener);

  window.addEventListener('beforeunload', () => {
    ipcRenderer.off('IPC_SCRIPTS_CHANNEL', listener);
  });

  checkInterval();
  // InjectedAppsIPCRoutes[InjectedAppsMessageType.RENDER_COMPONENT]({
  //   type: 'injected_sidebar',
  // });
};
