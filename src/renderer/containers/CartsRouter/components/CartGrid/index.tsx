import { useTheme } from 'styled-components';
import { AddCartGridElement } from '../AddCartGridElement';
import { BaseGridElement } from '../BaseGridElement';
import { CartGridContainer } from './styles';
import { CartGridProps } from './types';

export const CartGrid = ({
  items,
  loading,
  loadMore,
  onCreateCart,
}: CartGridProps) => {
  const {
    grayscale: { 100: gray100 },
  } = useTheme();

  return (
    <CartGridContainer>
      <AddCartGridElement onCreate={onCreateCart} />
      {items.map((item) => (
        <BaseGridElement
          key={item._id}
          bodySlot={
            item.items.length > 0 ? (
              <div>
                <ul>
                  {item.items.map((item) => (
                    <li key={item._id}>{item.name}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>No Items</div>
            )
          }
          bottomSlot={<div>{item._id}</div>}
        />
      ))}
    </CartGridContainer>
  );
};
