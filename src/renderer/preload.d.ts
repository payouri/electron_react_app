import {
  SenderMessage,
  RecipientResponse,
  ErrorMessage,
} from 'main/lib/MessageBridge/types';
import { initInjectedApps } from '../main/injectApps';
import {
  CROSS_WINDOW_CHANNEL,
  IPC_ROUTER_CHANNEL,
  IPC_SCRIPTS_CHANNEL,
} from '../main/router/constants';

type Channel =
  | typeof IPC_ROUTER_CHANNEL
  | typeof IPC_SCRIPTS_CHANNEL
  | typeof CROSS_WINDOW_CHANNEL;

declare global {
  interface Window {
    electron: {
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
      };
      nanoid: () => string;
    };
  }
}

export {};
