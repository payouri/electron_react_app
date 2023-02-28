import { WindowType } from 'main/lib/MessageBridge/types';
import {
  ErrorMessage,
  FailureResponse,
  MessageType,
  RecipientResponse,
  SuccessResponse,
} from 'main/lib/MessageBridge/types';
import { CrossWindowRequestType } from './constants';
import { isKnownRequestType } from './helpers/isKnownRequestType';
import { isValidSenderMessage } from './helpers/isValidSenderMessage';

const HandlersMap: {
  [CrossWindowRequestType.TEST]: () => Promise<
    SuccessResponse<unknown> | FailureResponse
  >;
} = {
  [CrossWindowRequestType.TEST]: () => {
    return Promise.resolve({
      hasFailed: false,
      payload: {
        test: Math.random(),
      },
    });
  },
};

export const crossWindowRequestHandler =
  (windowType: WindowType) =>
  async (
    request: unknown
  ): Promise<RecipientResponse<unknown> | ErrorMessage | undefined> => {
    if (!isValidSenderMessage(request)) {
      return {
        error: {
          code: 'INVALID_REQUEST',
          reason: 'Invalid request',
        },
        type: MessageType.ERROR,
      };
    }
    if (request.type !== MessageType.REQUEST) {
      return undefined;
    }
    if (request.recipientType !== windowType) {
      console.warn(
        `Request intended for ${request.recipientType} but received by ${windowType}`
      );
      return undefined;
    }
    if (!isKnownRequestType(request.requestType)) {
      return {
        hasFailed: true,
        requestId: request.requestId,
        type: MessageType.RESPONSE,
        error: {
          code: 'UNKNOWN_REQUEST_TYPE',
          reason: 'Unknown request type',
        },
      };
    }

    const response = await HandlersMap[request.requestType]();

    return {
      ...response,
      requestId: request.requestId,
      type: MessageType.RESPONSE,
    };
  };
