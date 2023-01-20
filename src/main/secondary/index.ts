/* eslint global-require: off, no-console: off, promise/always-return: off */

import { BrowserWindow } from 'electron';
import { getBrowserWindow, WindowType } from '../lib/Browser';
import MenuBuilder from '../menu';
import { resolveHtmlPath } from '../util';
import { SecondaryWindowType } from './types';

export * from './types';

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

  const secondaryWindow = getBrowserWindow({
    windowType: WindowType.SECONDARY,
  });

  secondaryWindow.loadURL(resolveHtmlPath('./secondary.html'));

  const menuBuilder = new MenuBuilder(secondaryWindow);
  menuBuilder.buildMenu();
  secondaryWindowsMap.set(type, secondaryWindow);

  secondaryWindow.on('closed', () => {
    secondaryWindowsMap.delete(type);
  });

  return secondaryWindow;
};
