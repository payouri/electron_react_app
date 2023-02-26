/* eslint global-require: off, no-console: off, promise/always-return: off */

import { BrowserWindow } from 'electron';
import { getBrowserWindow } from './Browser';
import { getDefaultSecondaryWindow } from './Default';
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

  if (type === SecondaryWindowType.BROWSER) {
    const browserWindow = getBrowserWindow({
      windowId: 'browser',
    });

    secondaryWindowsMap.set(type, browserWindow);

    browserWindow.on('closed', () => {
      secondaryWindowsMap.delete(type);
    });

    return browserWindow;
  }

  if (type === SecondaryWindowType.DEFAULT) {
    const secondaryWindow = await getDefaultSecondaryWindow();

    secondaryWindowsMap.set(type, secondaryWindow);

    secondaryWindow.on('closed', () => {
      secondaryWindowsMap.delete(type);
    });

    return secondaryWindow;
  }

  throw new Error(`Unknown secondary window type: ${type}`);
};
