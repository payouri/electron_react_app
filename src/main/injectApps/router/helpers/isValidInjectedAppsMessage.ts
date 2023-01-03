import { IncomingIPCMessage } from '../types';

export const isValidInjectedAppsMessage = (
  message: unknown
): message is IncomingIPCMessage => {
  return (
    typeof message === 'object' &&
    message !== null &&
    'type' in message &&
    'requestId' in message &&
    'payload' in message
  );
};
