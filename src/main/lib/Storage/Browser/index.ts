import { BrowserWindow } from 'electron';
// import { shell } from 'electron';

export { executeJavascript } from './helpers/executeJavascript';

type ExtendedBrowserWindow = BrowserWindow & {
  id: string;
};

const windows = new Map<string, ExtendedBrowserWindow>();

const createBrowserWindow = ({ id }: { id: string }): ExtendedBrowserWindow => {
  // shell.openExternal(`https://explorer.helium.com/hotspots`);
  const w = new BrowserWindow({
    webPreferences: {
      allowRunningInsecureContent: false,
      // javascript: false,
    },
    show: false,
    autoHideMenuBar: false,
    simpleFullscreen: true,
  });
  // w.setContentProtection(false);

  // w.loadURL('https://www.zalando.fr', { userAgent: 'Chrome' });

  // w.once('ready-to-show', () => {
  //   w.show();
  // });

  return Object.assign(w, { id });
};

export const getBrowserWindow = ({ id }: { id: string }) => {
  if (!windows.has(id)) {
    windows.set(id, createBrowserWindow({ id }));
  }

  return windows.get(id);
};
