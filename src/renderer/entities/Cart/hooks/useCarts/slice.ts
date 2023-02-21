import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart } from 'main/entities/Cart/Cart.types';
import { UseCartsState } from './types';

const initialState: UseCartsState = {
  carts: [],
  loading: false,
  hasMore: true,
  start: 0,
};

const slice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    setCartState(state, action: PayloadAction<Partial<UseCartsState>>) {
      return { ...state, ...action.payload };
    },
    pushCarts(state, action: PayloadAction<Cart[]>) {
      state.carts = [...state.carts, ...action.payload];
    },
    upsertCarts(state, action: PayloadAction<Cart[]>) {
      const { payload: newCarts } = action;

      const newCartsMap = new Map<string, Cart>();
      newCarts.forEach((cart) => newCartsMap.set(cart._id, cart));

      state.carts = [
        ...state.carts.map((cart) => {
          const newCart = newCartsMap.get(cart._id);

          if (newCart) {
            newCartsMap.delete(cart._id);
            return newCart;
          }

          return cart;
        }),
        ...newCartsMap.values(),
      ];
    },
    reset() {
      return initialState;
    },
  },
});

export const { actions, reducer, name: key } = slice;
export { initialState as initialCartsState };
