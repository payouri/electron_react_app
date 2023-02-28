import { UseAppsControllerState, UseAppsControllerStateReducer } from './types';

export const initialState: UseAppsControllerState = {
  mountedApps: [],
};

export const useAppsControllerStateReducer: UseAppsControllerStateReducer = (
  state,
  action
) => {
  switch (action.type) {
    case 'APP_MOUNTED': {
      if (state.mountedApps.includes(action.payload.appId)) return state;
      return {
        ...state,
        mountedApps: [...state.mountedApps, action.payload.appId],
      };
    }
    case 'APP_UNMOUNTED': {
      if (!state.mountedApps.includes(action.payload.appId)) return state;
      return {
        ...state,
        mountedApps: state.mountedApps.filter(
          (appId) => appId !== action.payload.appId
        ),
      };
    }
    default: {
      return state;
    }
  }
};
