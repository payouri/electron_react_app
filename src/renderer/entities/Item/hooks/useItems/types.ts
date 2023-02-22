import { Item } from 'main/entities/Item/Item.types';
import { ItemsState } from '../shared/types';

export type { ItemsState, Item };

export type UseItemsReturnType = ItemsState & {
  loadMore: () => Promise<void>;
  createItem: (param: Omit<Item, '_id'>) => Promise<Item>;
  updateItem: (item: Item) => Promise<Item>;
};
