import { AddItemGridElement } from '../AddItemGridElement';
import { ItemGridContainer } from './styles';
import { ItemGridProps } from './types';

export const ItemGrid = ({
  items,
  loading,
  loadMore,
  onCreateItem,
}: ItemGridProps) => {
  return (
    <ItemGridContainer>
      <AddItemGridElement onCreate={onCreateItem} />
      {items.map((item) => (
        <div key={item._id}>{item.name}</div>
      ))}
    </ItemGridContainer>
  );
};
