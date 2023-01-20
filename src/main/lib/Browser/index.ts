import { BrowserWindow, BrowserView, app } from 'electron';
import path from 'path';
import { WindowType } from './types';

export * from './types';
export { executeJavascript } from './helpers/executeJavascript';

type ExtendedBrowserWindow = BrowserWindow & {
  windowType: WindowType;
};

const windows = new Map<string, ExtendedBrowserWindow>();

const createBrowserWindow = ({
  windowType,
  size = { width: 800, height: 600 },
  autoShow = false,
}: {
  autoShow?: boolean;
  size?: { width: number; height: number };
  windowType: WindowType;
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

  if (autoShow) {
    w.once('ready-to-show', () => {
      w.show();
    });
  }

  w.on('closed', () => {
    windows.delete(windowType);
  });

  return Object.assign(w, { windowType });
};

export const getBrowserWindow = ({
  windowType,
}: {
  windowType: WindowType;
}) => {
  if (!windows.has(windowType)) {
    windows.set(windowType, createBrowserWindow({ windowType }));
  }

  return windows.get(windowType)!;
};
