import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createInjectorsEnhancer } from 'redux-injectors';
import { reducer as AppConfigReducer } from 'renderer/customHooks/useAppConfig/slice';

function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    ...injectedReducers,
    appConfig: AppConfigReducer,
    // other non-injected reducers can go here...
  });

  return rootReducer;
}

export const store = configureStore({
  reducer: createReducer(),
  preloadedState: {},
  enhancers: [createInjectorsEnhancer({ createReducer, runSaga: () => {} })],
});
