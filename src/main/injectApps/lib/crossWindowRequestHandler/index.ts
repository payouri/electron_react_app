import {
  WindowType,
  ErrorMessage,
  MessageType,
  RecipientResponse,
} from '../../../lib/MessageBridge/types';
import { isKnownRequestType } from './helpers/isKnownRequestType';
import { isValidInjectedAppsMessage } from '../../router/helpers/isValidInjectedAppsMessage';
import { getInjectedAppsIPCRoutes } from '../../router';

export const crossWindowRequestHandler = (windowType: WindowType) => {
  return ({
    microAppMountNode,
    onAppMount,
    onAppUnMount,
    pageNode,
  }: {
    microAppMountNode: Element;
    pageNode: Element;
    onAppMount: (appId: string) => void;
    onAppUnMount: (appId: string) => void;
  }) => {
    const HandlersMap = getInjectedAppsIPCRoutes({
      microAppMountNode,
      onAppMount,
      onAppUnMount,
      pageNode,
    });

    return async (
      request: unknown
    ): Promise<RecipientResponse<unknown> | ErrorMessage | undefined> => {
      if (!isValidInjectedAppsMessage(request)) {
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

      try {
        const response = await HandlersMap[request.requestType](
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          request.payload
        );

        return {
          ...response,
          requestId: request.requestId,
          type: MessageType.RESPONSE,
        };
      } catch (error) {
        console.error(error);

        return {
          hasFailed: true,
          requestId: request.requestId,
          type: MessageType.RESPONSE,
          error: {
            code: 'UNKNOWN_ERROR',
            reason: 'Unknown error',
          },
        };
      }
    };
  };
};
