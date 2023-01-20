import { CrossWindowMessage, MessageType } from '../types';

export const isValidCrossWindowMessage = <
  RequestType extends string,
  RequestPayload,
  ResponsePayload
>(
  message: unknown
): message is CrossWindowMessage<
  RequestType,
  RequestPayload,
  ResponsePayload
> => {
  if (typeof message !== 'object') return false;
  if (!message) return false;

  return (
    'type' in message &&
    message.type === 'string' &&
    Object.values(MessageType).includes(message.type as MessageType)
  );
};
