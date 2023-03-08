import {
  ErrorMessage,
  MessageType,
  RecipientResponse,
} from '../../../../main/lib/MessageBridge/types';

export const handleResponse = (
  response: RecipientResponse<unknown> | ErrorMessage,
  onError?: ({
    code,
    reason,
  }: {
    code: number | string;
    reason: string;
  }) => void
) => {
  if (response.type === MessageType.ERROR || response.hasFailed) {
    if (onError) {
      onError({
        code: response.error.code,
        reason: response.error.reason,
      });
      return null;
    }
    // throw new Error(`${response.error.code}: ${response.error.reason}`);
    return null;
  }

  return response.payload;
};
