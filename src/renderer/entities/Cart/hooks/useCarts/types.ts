import { Cart } from 'main/entities/Cart/Cart.types';
import { Item } from 'main/entities/Item/Item.types';

export type UseCartsState = {
  carts: Cart[];
  loading: boolean;
  hasMore: boolean;
  start: number;
};

export type UseCartsReturnType = UseCartsState & {
  loadMore: () => Promise<void>;
  createCart: (name: string) => Promise<Cart>;
  updateCart: (cartId: string, name: string) => Promise<Cart>;
  deleteCart: (cartId: string) => Promise<void>;
  getCart: (cartId: string) => Promise<Cart | null>;
  addItemsToCart: (cartId: string, items: Item[]) => Promise<void>;
};
