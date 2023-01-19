import { getSecondaryWindow } from 'main/secondary';
import { SecondaryWindowType } from 'main/secondary/types';
import { getElementPickerScript } from '../../../injectApps/helpers/scripts';
import { executeJavascript, getBrowserWindow } from '../../../lib/Browser';
import {
  IPCMessagePayload,
  IPCMessageType,
  IPCResponsePayload,
} from '../../types';

import { windowMessageBridge } from '../../../lib/MessageBridge';

// const secondaryWindow = getSecondaryWindow(SecondaryWindowType.DEFAULT);

// secondaryWindow.show();

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

    browser.webContents.postMessage('message-bridge', null, [
      windowMessageBridge.port1,
      windowMessageBridge.port2,
    ]);

    browser.loadURL(url, {
      userAgent: 'Chrome',
    });
  },
} as const;
