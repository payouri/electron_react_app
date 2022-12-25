import {
  IncomingIPCMessage,
  IPCResponsePayload,
  OutgoingIPCMessage,
  IPCMessageType,
} from 'main/router/types';
import { IPC_ROUTER_CHANNEL } from 'main/router/constants';

export { IPCMessageType as MessageType };

export type CHANNELS = typeof IPC_ROUTER_CHANNEL;

export type Message<Type extends IPCMessageType = IPCMessageType> =
  IncomingIPCMessage<Type>;

export type ResponseMessage<Type extends IPCMessageType = IPCMessageType> =
  OutgoingIPCMessage<Type>;

export type Response<Type extends IPCMessageType> = IPCResponsePayload[Type];
