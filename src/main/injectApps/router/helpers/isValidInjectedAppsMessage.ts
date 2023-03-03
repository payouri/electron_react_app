import { IncomingIPCMessage } from '../types';

/**
 * Returns true if the given message is a valid injected apps message, false
 * otherwise. Note that this does not verify that the message is actually
 * intended for this app, or that the app is allowed to process this message.
 * It only verifies that the message is a valid injected apps message, i.e.
 * it has the correct structure.
 *
 * @param message - The message to validate.
 * @returns True if the given message is a valid injected apps message, false
 * otherwise.
 */

export const isValidInjectedAppsMessage = (
  message: unknown
): message is IncomingIPCMessage => {
  return (
    typeof message === 'object' &&
    message !== null &&
    'type' in message &&
    typeof (message as IncomingIPCMessage).type === 'string' &&
    'requestId' in message &&
    typeof (message as IncomingIPCMessage).requestId === 'string' &&
    'payload' in message
  );
};
