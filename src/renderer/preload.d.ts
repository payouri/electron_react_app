import { IPC_ROUTER_CHANNEL } from 'main/router/constants';

type Channel = typeof IPC_ROUTER_CHANNEL;

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(channel: Channel, args: unknown[]): void;
        on(
          channel: Channel,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: Channel, func: (...args: unknown[]) => void): void;
      };
    };
  }
}

export {};
