import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartSelectorState } from './types';

const initialState: CartSelectorState = {
  selectedCart: undefined,
};

const slice = createSlice({
  name: 'cartSelector',
  initialState,
  reducers: {
    setSelectedCart: (state, action: PayloadAction<string | undefined>) => {
      if (action.payload) {
        state.selectedCart = action.payload;
      } else {
        state.selectedCart = undefined;
      }
    },
    reset: () => initialState,
  },
});

export const { actions, reducer, name: key } = slice;
export { initialState as initialCartSelectorState };
