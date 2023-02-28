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

export type SenderMessage<RequestType extends string, RequestPayload> = {
  type: MessageType.REQUEST;
  senderType: WindowType;
  recipientType: WindowType;
  requestId: string;
  requestType: RequestType;
  payload: RequestPayload;
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

export type RecipientResponse<MessagePayload> = {
  type: MessageType.RESPONSE;
  requestId: string;
} & HandlerResponse<MessagePayload>;

export type InjectedAppsMessagePayload = {
  [InjectedAppsCrossWindowRequestType.RENDER_COMPONENT]: {
    type: 'injected_sidebar';
  };
  [InjectedAppsCrossWindowRequestType.DESTROY_COMPONENT]: {
    type: 'injected_sidebar';
  };
  [InjectedAppsCrossWindowRequestType.HEALTH_CHECK]: void;
};

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
> = RecipientResponse<InjectedAppsMessageResponse[Type]>;
