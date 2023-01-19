import { initInjectedApps } from '../main/injectApps';
import {
  IPC_ROUTER_CHANNEL,
  IPC_SCRIPTS_CHANNEL,
} from '../main/router/constants';

type Channel = typeof IPC_ROUTER_CHANNEL | typeof IPC_SCRIPTS_CHANNEL;

declare global {
  interface Window {
    electron: {
      initInjectedApps: typeof initInjectedApps;
      ipcRenderer: {
        sendMessage(channel: Channel, args: unknown[]): void;
        on(
          channel: Channel,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: Channel, func: (...args: unknown[]) => void): void;
      };
      nanoid: () => string;
    };
  }
}

export {};
