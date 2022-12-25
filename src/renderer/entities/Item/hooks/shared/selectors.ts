import { RootState } from 'renderer/store/types';
import { initialItemsState } from './constants';

export const selectItemsState = (state: RootState) =>
  state.items || initialItemsState;
