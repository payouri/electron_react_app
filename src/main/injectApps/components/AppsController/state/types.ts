import { Reducer } from 'react';

export type UseAppsControllerState = {
  mountedApps: string[];
};

export type UseAppsControllerAction =
  | {
      type: 'APP_MOUNTED';
      payload: {
        appId: string;
      };
    }
  | {
      type: 'APP_UNMOUNTED';
      payload: {
        appId: string;
      };
    };

export type UseAppsControllerStateReducer = Reducer<
  UseAppsControllerState,
  UseAppsControllerAction
>;
