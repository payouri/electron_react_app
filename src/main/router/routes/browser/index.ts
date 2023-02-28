import { executeJavascript } from '../../../secondary/Browser';
import { getSecondaryWindow, SecondaryWindowType } from '../../../secondary';
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

    const browser = await getSecondaryWindow(SecondaryWindowType.BROWSER);

    if (maximize) {
      browser.maximize();
    }

    executeJavascript(
      browser.webContents,
      'window.electron.initInjectedApps(window.electron);'
    );

    if (scriptsToRun?.length) {
      console.log('scriptsToRun', scriptsToRun);
    }

    browser.loadURL(url, {
      userAgent: 'Chrome',
    });

    browser.once('ready-to-show', () => {
      browser.show();
    });
  },
} as const;
