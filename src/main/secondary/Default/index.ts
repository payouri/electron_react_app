import { BrowserWindow } from 'electron';
import MenuBuilder from '../../menu';
import { resolveHtmlPath } from '../../util';
import { getBrowserWindow } from '../Browser';

export const getDefaultSecondaryWindow = async (): Promise<BrowserWindow> => {
  const secondaryWindow = getBrowserWindow({
    windowId: 'default',
  });

  secondaryWindow.loadURL(resolveHtmlPath('./secondary.html'));

  secondaryWindow.webContents.session.webRequest.onBeforeRequest(
    (details, callback) => {
      // console.log(details.url);
      // if (
      //   details.url.startsWith('http') &&
      //   !details.url.startsWith('http://localhost') &&
      //   !details.url.startsWith('https://localhost')
      // ) {
      //   callback({
      //     cancel: false,
      //     redirectURL: `http://localhost:9999/proxy/${details.url}`,
      //   });
      // } else {
      callback({
        cancel: false,
      });
      // }
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

  return secondaryWindow;
};
