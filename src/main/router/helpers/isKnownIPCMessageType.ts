import { IncomingIPCMessage } from '../types';

export const isKnownIPCMessageType = (
  message: unknown
): message is IncomingIPCMessage =>
  typeof message === 'object' &&
  message !== null &&
  'type' in message &&
  'payload' in message &&
  'requestId' in message;
