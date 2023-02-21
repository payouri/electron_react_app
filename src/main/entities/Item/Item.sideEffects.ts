import { StorageType, StorageTypeMap } from '../../lib/Storage';
import { Cart } from '../Cart/Cart.types';
import { Item } from './Item.types';

export const bindItemSideEffects = ({
  cartCollection,
  itemCollection,
}: {
  cartCollection: StorageTypeMap<Cart>[StorageType.DB];
  itemCollection: StorageTypeMap<Item>[StorageType.DB];
}) => {
  itemCollection.on('itemUpdated', async (item) => {
    const carts = await cartCollection.query({
      filter: {
        'items._id': item._id,
      },
    });

    if (!carts.length) return;

    await Promise.all(
      carts.map((cart) =>
        cartCollection.set(cart._id, {
          ...cart,
          items: cart.items.map((cartItem) =>
            cartItem._id === item._id ? item : cartItem
          ),
        })
      )
    );
  });
};
