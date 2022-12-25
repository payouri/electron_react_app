import { RootState } from 'renderer/store/types';
import { initialConfigsState } from './slice';
import { UseAppConfigState } from './types';

export const selectAppConfigState = (state: RootState): UseAppConfigState =>
  state.appConfig || initialConfigsState;
