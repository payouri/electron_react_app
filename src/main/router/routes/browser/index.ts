import { getElementPickerScript } from '../../../injectApps/helpers/scripts';
import { executeJavascript, getBrowserWindow } from '../../../lib/Browser';
import {
  IPCMessagePayload,
  IPCMessageType,
  IPCResponsePayload,
} from '../../types';

export const BrowserRoutes = {
  [IPCMessageType.OPEN_BROWSER]: async (
    payload: IPCMessagePayload[IPCMessageType.OPEN_BROWSER]
  ): Promise<IPCResponsePayload[IPCMessageType.OPEN_BROWSER]> => {
    const { url, scriptsToRun, maximize } = payload;

    const browser = getBrowserWindow({
      windowId: 'default',
    });

    if (maximize) {
      browser.maximize();
    }

    executeJavascript(
      browser.webContents,
      'window.electron.initInjectedApps();'
    );

    if (scriptsToRun?.length) {
      console.log('scriptsToRun', scriptsToRun);
    }

    browser.loadURL(url, {
      userAgent: 'Chrome',
    });
  },
} as const;
