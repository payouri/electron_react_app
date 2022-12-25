import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from 'main/entities/Item/Item.types';
import { initialItemsState } from './constants';
import { ItemsState } from './types';

const slice = createSlice({
  name: 'items',
  initialState: initialItemsState,
  reducers: {
    setItemState(state, action: PayloadAction<Partial<ItemsState>>) {
      return { ...state, ...action.payload };
    },
    pushItems(state, action: PayloadAction<Item[]>) {
      state.items = [...state.items, ...action.payload];
    },
    addItem(state, action: PayloadAction<Item>) {
      state.items = [action.payload, ...state.items];
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    updateItem(state, action: PayloadAction<Item>) {
      state.items = state.items.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    },
    reset() {
      return initialItemsState;
    },
  },
});

export const { actions, reducer, name: key } = slice;
export { initialItemsState };
