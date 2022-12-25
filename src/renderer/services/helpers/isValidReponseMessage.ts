import { MessageType, ResponseMessage } from '../types';

export const isValidReponseMessage = <Type extends MessageType>(
  params: unknown
): params is ResponseMessage<Type> => {
  if (typeof params !== 'object' || params === null) return false;
  if (!Object.prototype.hasOwnProperty.call(params, 'type')) return false;
  if (!Object.prototype.hasOwnProperty.call(params, 'requestId')) return false;
  if (!Object.prototype.hasOwnProperty.call(params, 'payload')) return false;
  return true;
};
