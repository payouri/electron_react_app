/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-await-in-loop */
import { createRoot } from 'react-dom/client';
import { AppsController } from './components/AppsController';
import { initRootPageNode } from './helpers/initRootPageNode';
import { IPC_API } from './types';

export const initInjectedApps = async (arg: { ipcRenderer: IPC_API }) => {
  const pageNode = initRootPageNode();

  createRoot(pageNode).render(
    <AppsController pageNode={pageNode} {...arg.ipcRenderer} />
  );
};
