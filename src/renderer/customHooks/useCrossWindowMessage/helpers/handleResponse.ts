import {
  ErrorMessage,
  MessageType,
  RecipientResponse,
} from '../../../../main/lib/MessageBridge/types';

export const handleResponse = (
  response: RecipientResponse<unknown> | ErrorMessage
) => {
  if (response.type === MessageType.ERROR || response.hasFailed) {
    throw new Error(`${response.error.code}: ${response.error.reason}`);
  }

  return response.payload;
};
