import { Item } from 'main/entities/Item/Item.types';

export type ItemGridProps = {
  items: Item[];
  loading: boolean;
  loadMore: () => void;
  onCreateItem: () => void;
  onEditItem: (item: Item) => void;
  onAddToCart: (cartId: string, item: Item) => void;
};
