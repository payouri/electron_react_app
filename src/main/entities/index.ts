import { StorageType, StorageTypeMap } from '../lib/Storage';
import { getCartCollection } from './Cart/Cart.collection';
import { Cart } from './Cart/Cart.types';
import { getItemCollection } from './Item/Item.collection';
import { bindItemSideEffects } from './Item/Item.sideEffects';
import { Item } from './Item/Item.types';
import { getProfileCollection } from './Profile/Profile.collection';
import { getTagCollection } from './Tag/Tag.collection';
import { bindTagSideEffects } from './Tag/Tag.sideEffects';
import { Tag } from './Tag/Tag.types';

export const runSideEffects = ({
  cartCollection,
  itemCollection,
  tagCollection,
}: {
  cartCollection: StorageTypeMap<Cart>[StorageType.DB];
  itemCollection: StorageTypeMap<Item>[StorageType.DB];
  tagCollection: StorageTypeMap<Tag>[StorageType.DB];
}) => {
  bindItemSideEffects({
    cartCollection,
    itemCollection,
  });
  bindTagSideEffects({
    itemCollection,
    tagCollection,
  });
};

export {
  getCartCollection,
  getItemCollection,
  getTagCollection,
  getProfileCollection,
};
