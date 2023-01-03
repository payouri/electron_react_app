import { BrowserWindow, BrowserView, app } from 'electron';
import path from 'path';
// import { shell } from 'electron';

export { executeJavascript } from './helpers/executeJavascript';

type ExtendedBrowserWindow = BrowserWindow & {
  windowId: string;
};

const windows = new Map<string, ExtendedBrowserWindow>();

const createBrowserWindow = ({
  windowId,
}: {
  windowId: string;
}): ExtendedBrowserWindow => {
  // shell.openExternal(`https://explorer.helium.com/hotspots`);
  path.join(process.cwd(), '/.erb/dll/preload.js');
  const w = new BrowserWindow({
    webPreferences: {
      allowRunningInsecureContent: false,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(process.cwd(), '/.erb/dll/preload.js'),
    },
    show: false,
    autoHideMenuBar: false,
    simpleFullscreen: true,
  });
  w.setContentProtection(false);
  w.setBrowserView(new BrowserView());

  w.once('ready-to-show', () => {
    w.show();
  });

  w.on('closed', () => {
    windows.delete(windowId);
  });

  return Object.assign(w, { windowId });
};

export const getBrowserWindow = ({ windowId }: { windowId: string }) => {
  if (!windows.has(windowId)) {
    windows.set(windowId, createBrowserWindow({ windowId }));
  }

  return windows.get(windowId)!;
};
