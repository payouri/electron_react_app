import {
  SenderMessage,
  RecipientResponse,
  ErrorMessage,
} from '../main/lib/MessageBridge/types';
import { initInjectedApps } from '../main/injectApps';
import {
  CROSS_WINDOW_CHANNEL,
  IPC_ROUTER_CHANNEL,
  IPC_SCRIPTS_CHANNEL,
  IPC_SCRIPTS_RESPONSE_CHANNEL,
} from '../main/router/constants';

type Channel =
  | typeof IPC_ROUTER_CHANNEL
  | typeof IPC_SCRIPTS_CHANNEL
  | typeof IPC_SCRIPTS_RESPONSE_CHANNEL
  | typeof CROSS_WINDOW_CHANNEL;

export type ElectronExposedAPI = {
  initInjectedApps: typeof initInjectedApps;
  ipcRenderer: {
    sendMessage(channel: Channel, args: unknown[]): void;
    sendCrossWindowRequest(
      arg: SenderMessage<string, unknown>
    ): Promise<RecipientResponse<unknown> | ErrorMessage>;
    sendCrossWindowResponse(
      arg: RecipientResponse<unknown> | ErrorMessage
    ): void;
    on(
      channel: Channel,
      func: (...args: unknown[]) => void
    ): (() => void) | undefined;
    once(channel: Channel, func: (...args: unknown[]) => void): void;
    off(channel: Channel, func: (...args: unknown[]) => void): void;
    removeAllListeners(channel: Channel): void;
  };
  nanoid: () => string;
};

declare global {
  interface Window {
    electron: ElectronExposedAPI;
  }
}

export {};
