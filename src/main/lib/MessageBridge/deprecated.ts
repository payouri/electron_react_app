import { MessageChannelMain, MessageEvent } from 'electron';
import { nanoid } from 'nanoid';

const WindowMessageBridge = <
  Message extends { type: string; payload: unknown }
>() => {
  const state = {
    initialized: false,
  };

  const { port1, port2 } = new MessageChannelMain({
    // captureRejections: true,
  });

  const generateMessageId = () => {
    return nanoid();
  };

  port1.start();
  port2.start();

  state.initialized = true;

  return {
    // bindMainListener: (window: BrowserWindow) => {
    //   if (!state.initialized) return;

    //   window.webContents.on("", (message: MessageEvent) => {
    //     port1.postMessage(message.data);
    //   });
    // },
    // bindSecondaryListener: (window: BrowserWindow) => {
    //   if (!state.initialized) return;

    //   window.webContents.on('message', (message: MessageEvent) => {
    //     port2.postMessage(message.data);
    //   });
    // },
    mainSendMessage: () => {
      const messageId = generateMessageId();

      console.log('Sending message', messageId);

      return new Promise((resolve) => {
        const listener = (message: MessageEvent) => {
          if (message.data.messageId !== messageId) return;

          console.log('Received message', message);

          resolve(message);
          port1.off('message', listener);
        };

        port1.on('message', listener);

        port1.postMessage({
          type: 'message',
          messageId,
          payload: {
            message: 'Hello from main process',
          },
        });
      });
    },
    secondarySendMessage: () => {
      const messageId = generateMessageId();

      console.log('Sending message', messageId);

      return new Promise((resolve) => {
        const listener = (message: MessageEvent) => {
          if (message.data.messageId !== messageId) return;

          console.log('Received message', message);
          resolve(message);

          port2.off('message', listener);
        };

        port2.on('message', listener);
        port2.postMessage({
          type: 'message',
          messageId,
          payload: {
            message: 'Hello from main process',
          },
        });
      });
    },
    destroy: () => {
      port1.close();
      port2.close();
      state.initialized = false;
    },
    port1,
    port2,
  };
};

export const windowMessageBridge = WindowMessageBridge();
