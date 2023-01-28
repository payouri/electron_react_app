import { SenderMessage } from 'main/lib/MessageBridge/types';

export const isValidSenderMessage = (
  message: unknown
): message is SenderMessage<string, unknown> => {
  return (
    typeof message === 'object' &&
    message !== null &&
    'type' in message &&
    typeof message.type === 'string'
  );
};
