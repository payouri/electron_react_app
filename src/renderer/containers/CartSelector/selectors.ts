import { RootState } from 'renderer/store/types';
import { initialCartSelectorState } from './slice';
import { CartSelectorState } from './types';

export const selectCartSelectorState = (state: RootState): CartSelectorState =>
  state.cartSelector || initialCartSelectorState;
