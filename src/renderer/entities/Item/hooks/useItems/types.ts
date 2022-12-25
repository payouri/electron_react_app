import { ItemsState } from '../shared/types';

export type UseItemsReturnType = ItemsState & {
  loadMore: () => Promise<void>;
};
