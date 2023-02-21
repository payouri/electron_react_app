import { Cart } from 'main/entities/Cart/Cart.types';
import { useState } from 'react';
import { Button } from 'renderer/components/Button';
import { CartSelector } from 'renderer/containers/CartSelector';
import { useTheme } from 'styled-components';
import { AddItemGridElement } from '../AddItemGridElement';
import { BaseGridElement } from '../BaseGridElement';
import { AddToCartWrapper, ItemGridContainer } from './styles';
import { ItemGridProps } from './types';

export const ItemGrid = ({
  items,
  loading,
  loadMore,
  onCreateItem,
  onEditItem,
  onAddToCart,
}: ItemGridProps) => {
  const {
    grayscale: { 100: gray100 },
  } = useTheme();
  const [selectedCart, setSelectedCart] = useState<Cart | undefined>(undefined);

  return (
    <ItemGridContainer>
      <AddItemGridElement onCreate={onCreateItem} />
      {items.map((item) => (
        <BaseGridElement
          key={item._id}
          bodySlot={<div>{item.name}</div>}
          carouselProps={{
            images: [],
            background: gray100,
          }}
          bottomSlot={<div>{item._id}</div>}
          overlayVisible
          overlaySlot={
            <>
              <Button
                size="small"
                color="colorless"
                onClick={() => {
                  onEditItem(item);
                }}
              >
                Edit
              </Button>
              <AddToCartWrapper>
                <CartSelector onChange={setSelectedCart} />
                <Button
                  size="small"
                  color="colorless"
                  onClick={() => {
                    if (selectedCart && item)
                      onAddToCart(selectedCart._id, item);
                  }}
                >
                  Add to Cart
                </Button>
              </AddToCartWrapper>
            </>
          }
        />
      ))}
    </ItemGridContainer>
  );
};
