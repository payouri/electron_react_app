import { RootState } from 'renderer/store/types';
import { initialCartsState } from './slice';

export const selectCartsState = (state: RootState) =>
  state.carts || initialCartsState;
