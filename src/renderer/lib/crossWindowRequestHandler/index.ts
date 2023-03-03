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

// This function accepts a message type and returns a function that can handle messages of that type.
// It is used to create handlers for messages from the parent window
// and messages from the child window.
export const crossWindowRequestHandler =
  (windowType: WindowType) =>
  async (
    request: unknown
  ): Promise<RecipientResponse<unknown> | ErrorMessage | undefined> => {
    // Validate message
    if (!isValidSenderMessage(request)) {
      return {
        error: {
          code: 'INVALID_REQUEST',
          reason: 'Invalid request',
        },
        type: MessageType.ERROR,
      };
    }
    // Ignore messages that are not of type request
    if (request.type !== MessageType.REQUEST) {
      return undefined;
    }
    // Ignore messages that are not intended for this window type
    if (request.recipientType !== windowType) {
      console.warn(
        `Request intended for ${request.recipientType} but received by ${windowType}`
      );
      return undefined;
    }
    // Ignore messages of unknown request type
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

    // Handle message
    const response = await HandlersMap[request.requestType]();

    return {
      ...response,
      requestId: request.requestId,
      type: MessageType.RESPONSE,
    };
  };
