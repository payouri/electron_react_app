import { ItemsState } from './types';

export const ITEM_PAGE_SIZE = 20;

export const initialItemsState: ItemsState = {
  items: [],
  loading: false,
  hasMore: true,
  start: 0,
};
