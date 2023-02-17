/* eslint global-require: off, no-console: off, promise/always-return: off */

import { BrowserWindow } from 'electron';
import { WindowType } from '../lib/Browser/types';
import { getBrowserWindow } from '../lib/Browser';
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

  secondaryWindow.webContents.session.webRequest.onBeforeRequest(
    (details, callback) => {
      // console.log(details.url);
      if (
        details.url.startsWith('http') &&
        !details.url.startsWith('http://localhost') &&
        !details.url.startsWith('https://localhost')
      ) {
        callback({
          cancel: false,
          redirectURL: `http://localhost:9999/proxy/${details.url}`,
        });
      } else {
        callback({
          cancel: false,
        });
      }
    }
  );

  secondaryWindow.webContents.session.webRequest.onHeadersReceived(
    { urls: ['*://*/*'] },
    (d, c) => {
      if (d.responseHeaders?.['X-Frame-Options']) {
        delete d.responseHeaders['X-Frame-Options'];
      } else if (d.responseHeaders?.['x-frame-options']) {
        delete d.responseHeaders['x-frame-options'];
      }

      if (!d.url.startsWith('http://localhost')) {
        console.log({
          'd.responseHeaders': d.responseHeaders,
        });
      }

      c({
        cancel: false,
        responseHeaders: {
          ...d.responseHeaders,
        },
      });
    }
  );

  const menuBuilder = new MenuBuilder(secondaryWindow);
  menuBuilder.buildMenu();
  secondaryWindowsMap.set(type, secondaryWindow);

  secondaryWindow.on('closed', () => {
    secondaryWindowsMap.delete(type);
  });

  return secondaryWindow;
};
