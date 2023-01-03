export enum InjectedAppsMessageType {
  RENDER_COMPONENT = 'RENDER_COMPONENT',
  DESTROY_COMPONENT = 'DESTROY_COMPONENT',
}

export type InjectedAppsMessagePayload = {
  [InjectedAppsMessageType.RENDER_COMPONENT]: {
    type: 'injected_sidebar';
  };
  [InjectedAppsMessageType.DESTROY_COMPONENT]: {
    type: 'injected_sidebar';
  };
};

export type IncomingIPCMessage<
  Type extends InjectedAppsMessageType = InjectedAppsMessageType
> = {
  type: Type;
  requestId: string;
  payload: InjectedAppsMessagePayload[Type];
};
