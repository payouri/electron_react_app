import { app, BrowserView, BrowserWindow } from 'electron';
import path from 'path';

export { executeJavascript } from './helpers/executeJavascript';

type ExtendedBrowserWindow = BrowserWindow & {
  customId: string;
};

const windows = new Map<string, ExtendedBrowserWindow>();

const createBrowserWindow = ({
  windowId,
  size = { width: 800, height: 600 },
  autoShow = false,
}: {
  autoShow?: boolean;
  size?: { width: number; height: number };
  windowId: string;
}): ExtendedBrowserWindow => {
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  const w = new BrowserWindow({
    icon: getAssetPath('icon.png'),
    width: size.width,
    height: size.height,
    webPreferences: {
      // webSecurity: false,
      // allowRunningInsecureContent: false,
      // allowRunningInsecureContent: true,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(process.cwd(), '/.erb/dll/preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    show: false,
    autoHideMenuBar: false,
    simpleFullscreen: true,
  });
  w.setContentProtection(false);
  w.setBrowserView(new BrowserView());

  if (autoShow) {
    w.once('ready-to-show', () => {
      w.show();
    });
  }

  w.on('closed', () => {
    windows.delete(windowId);
  });

  return Object.assign(w, { customId: 'default' });
};

export const getBrowserWindow = ({ windowId }: { windowId: string }) => {
  if (!windows.has(windowId)) {
    windows.set(windowId, createBrowserWindow({ windowId }));
  }

  return windows.get(windowId)!;
};
