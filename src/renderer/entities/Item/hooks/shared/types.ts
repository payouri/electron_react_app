import { Item } from 'main/entities/Item/Item.types';

export type ItemsState = {
  items: Item[];
  loading: boolean;
  hasMore: boolean;
  start: number;
};
