import { spawn } from 'child_process';
import { app, ipcMain } from 'electron';
import path from 'path';
import {
  getCartCollection,
  getItemCollection,
  getTagCollection,
  runSideEffects,
} from './entities';
import { MessageBridgeHandler } from './lib/MessageBridge';
import { createWindow, getMainWindow } from './mainWindow';
import {
  buildIPCScriptsRouterResponse,
  CROSS_WINDOW_CHANNEL,
  IPCRouter,
  IPCScriptsRouter,
  IPC_ROUTER_CHANNEL,
  IPC_SCRIPTS_CHANNEL,
  IPC_SCRIPTS_RESPONSE_CHANNEL,
} from './router';

ipcMain.on(IPC_SCRIPTS_CHANNEL, IPCScriptsRouter);
ipcMain.on(
  IPC_SCRIPTS_RESPONSE_CHANNEL,
  buildIPCScriptsRouterResponse(() => getMainWindow())
);
ipcMain.on(IPC_ROUTER_CHANNEL, IPCRouter);
ipcMain.on(CROSS_WINDOW_CHANNEL, MessageBridgeHandler);

app.on('window-all-closed', async () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(async () => {
    const args = path.join(__dirname, 'preload.js');
    const [cartCollection, itemCollection, tagCollection] = await Promise.all([
      getCartCollection(),
      getItemCollection(),
      getTagCollection(),
    ]);
    runSideEffects({
      cartCollection,
      itemCollection,
      tagCollection,
    });

    await Promise.all([
      createWindow(),
      // eslint-disable-next-line promise/always-return
      ...(app.isPackaged ? [spawn('node', [args])] : []),
    ]);

    app.on('activate', async () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (getMainWindow() === null) await createWindow();
    });
  })
  .catch(console.log);
