/* eslint global-require: off, no-console: off, promise/always-return: off */

import { app, BrowserWindow } from 'electron';
import path from 'path';
import { windowMessageBridge } from '../lib/MessageBridge';
import MenuBuilder from '../menu';
import { resolveHtmlPath } from '../util';
import { SecondaryWindowType } from './types';

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const secondaryWindowsMap = new Map<SecondaryWindowType, BrowserWindow>();

export const getSecondaryWindow = async (
  type: SecondaryWindowType
): Promise<BrowserWindow> => {
  if (secondaryWindowsMap.has(type)) {
    return secondaryWindowsMap.get(type) as BrowserWindow;
  }
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  console.log(path.join(__dirname, '../../../.erb/dll/preload.js'));
  const secondaryWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      contextIsolation: true,
      preload: app.isPackaged
        ? path.join(__dirname, './preload.js')
        : path.join(__dirname, '../../../.erb/dll/preload.js'),
    },
  });

  secondaryWindow.webContents.postMessage('message-bridge', null, [
    windowMessageBridge.port2,
  ]);

  secondaryWindow.loadURL(resolveHtmlPath('./secondary.html'));

  const menuBuilder = new MenuBuilder(secondaryWindow);
  menuBuilder.buildMenu();
  secondaryWindowsMap.set(type, secondaryWindow);

  secondaryWindow.on('closed', () => {
    secondaryWindowsMap.delete(type);
  });

  return secondaryWindow;
};
