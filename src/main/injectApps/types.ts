import { ErrorMessage } from '../lib/MessageBridge/types';
import {
  CROSS_WINDOW_CHANNEL,
  IPC_ROUTER_CHANNEL,
  IPC_SCRIPTS_CHANNEL,
  IPC_SCRIPTS_RESPONSE_CHANNEL,
} from '../router/constants';
import { RecipientResponse, SenderMessage } from './router/types';

export type Channel =
  | typeof IPC_ROUTER_CHANNEL
  | typeof IPC_SCRIPTS_CHANNEL
  | typeof IPC_SCRIPTS_RESPONSE_CHANNEL
  | typeof CROSS_WINDOW_CHANNEL;

export type IPC_API = {
  sendMessage(channel: Channel, args: unknown[]): void;
  sendCrossWindowRequest(
    arg: SenderMessage<string, unknown>
  ): Promise<RecipientResponse<unknown> | ErrorMessage>;
  sendCrossWindowResponse(arg: RecipientResponse<unknown> | ErrorMessage): void;
  on(
    channel: Channel,
    func: (...args: unknown[]) => void
  ): (() => void) | undefined;
  once(channel: Channel, func: (...args: unknown[]) => void): void;
  off(channel: Channel, func: (...args: unknown[]) => void): void;
  removeAllListeners(channel: Channel): void;
};
