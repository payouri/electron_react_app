import { Cart } from 'main/entities/Cart/Cart.types';

export type UseCartsState = {
  carts: Cart[];
  loading: boolean;
  hasMore: boolean;
  start: number;
};

export type UseCartsReturnType = UseCartsState & {
  loadMore: () => Promise<void>;
};
