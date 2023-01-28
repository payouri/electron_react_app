import { WindowType } from '../Browser/types';

export enum MessageType {
  REQUEST = 'request',
  RESPONSE = 'response',
  ERROR = 'error',
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

export type RecipientResponse<MessagePayload> = {
  type: MessageType.RESPONSE;
  requestId: string;
} & (SuccessResponse<MessagePayload> | FailureResponse);

export type ErrorMessage = {
  type: MessageType.ERROR;
  error: {
    code: string;
    reason: string;
  };
};

export type CrossWindowMessage<
  RequestType extends string,
  RequestPayload,
  ResponsePayload
> =
  | SenderMessage<RequestType, RequestPayload>
  | RecipientResponse<ResponsePayload>;
