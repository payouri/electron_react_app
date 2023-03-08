import { ElementPickerProps } from '../components/ElementPicker/types';

export enum SecondaryWindowType {
  DEFAULT = 'DEFAULT',
  BROWSER = 'BROWSER',
}

export enum MainWindowType {
  DEFAULT = 'main_default',
}

export type WindowType = SecondaryWindowType | MainWindowType;

export enum MessageType {
  REQUEST = 'request',
  RESPONSE = 'response',
  ERROR = 'error',
}

export enum InjectedAppsCrossWindowRequestType {
  RENDER_COMPONENT = 'RENDER_COMPONENT',
  DESTROY_COMPONENT = 'DESTROY_COMPONENT',
  HEALTH_CHECK = 'HEALTH_CHECK',
}

/**
 * This is a utility type that models a message that can be sent from a sender window to a recipient window.
 * */
export type SenderMessage<RequestType extends string, RequestPayload> = {
  type: MessageType.REQUEST;
  senderType: WindowType;
  recipientType: WindowType;
  requestId: string;
  requestType: RequestType;
  payload: RequestPayload;
};

// This is the type of the message payload that the injected app will send back
// to the host app in response to a request.

export type InjectedAppsMessagePayload = {
  [InjectedAppsCrossWindowRequestType.RENDER_COMPONENT]:
    | {
        type: 'injected_sidebar';
      }
    | {
        type: 'element_picker';
        props: ElementPickerProps;
      };
  [InjectedAppsCrossWindowRequestType.DESTROY_COMPONENT]: {
    type: 'injected_sidebar' | 'element_picker';
  };
  [InjectedAppsCrossWindowRequestType.HEALTH_CHECK]: void;
};

export type SuccessResponse<ResponsePayload> = {
  hasFailed: false;
  payload: ResponsePayload;
};

export type FailureResponse = {
  hasFailed: true;
  error: {
    code: string;
    reason: string;
  };
};

export type HandlerResponse<MessagePayload> =
  | SuccessResponse<MessagePayload>
  | FailureResponse;

// This is a type definition for the recipient response.
// It is used in the code when we are sending a response to a request that was sent by the recipient.
// The type is of type RESPONSE and contains the id of the request that we are responding to.

export type RecipientResponse<MessagePayload> = {
  type: MessageType.RESPONSE;
  requestId: string;
} & HandlerResponse<MessagePayload>;

export type InjectedAppsMessageResponse = {
  [InjectedAppsCrossWindowRequestType.RENDER_COMPONENT]: void;
  [InjectedAppsCrossWindowRequestType.DESTROY_COMPONENT]: void;
  [InjectedAppsCrossWindowRequestType.HEALTH_CHECK]: { isAlive: true };
};

export type IncomingIPCMessage<
  Type extends InjectedAppsCrossWindowRequestType = InjectedAppsCrossWindowRequestType
> = SenderMessage<Type, InjectedAppsMessagePayload[Type]>;

export type OutGoingIPCMessage<
  Type extends InjectedAppsCrossWindowRequestType = InjectedAppsCrossWindowRequestType
> = SuccessResponse<InjectedAppsMessageResponse[Type]> | null;
