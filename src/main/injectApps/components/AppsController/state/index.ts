import { useReducer } from 'react';
import { initialState, useAppsControllerStateReducer } from './reducer';

export const useAppsControllerState = () => {
  const [state, dispatch] = useReducer(
    useAppsControllerStateReducer,
    initialState
  );

  return {
    state,
    dispatch,
  };
};
