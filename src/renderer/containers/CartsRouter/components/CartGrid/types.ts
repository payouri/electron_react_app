import { Cart } from 'main/entities/Cart/Cart.types';

export type CartGridProps = {
  items: Cart[];
  loading: boolean;
  loadMore: () => Promise<void>;
  onCreateCart: () => void;
};
