import { createStorage, StorageType } from '../../lib/Storage';
import { DbStorageAPI } from '../../lib/Storage/DbStorage/types';
import { Cart } from './Cart.types';
import { cartSchema } from './Cart.zod';

const CART_COLLECTION_NAME = 'carts';

let cartCollection: DbStorageAPI<Cart> | null = null;

export const createCartCollection = async (): Promise<DbStorageAPI<Cart>> =>
  createStorage<Cart>({
    name: CART_COLLECTION_NAME,
    type: StorageType.DB,
    validator: async (value) => {
      try {
        const result = await cartSchema.safeParseAsync(value);
        return result;
      } catch (error) {
        return false;
      }
    },
  });

export const getCartCollection = async (): Promise<DbStorageAPI<Cart>> => {
  if (!cartCollection) {
    cartCollection = await createCartCollection();
  }

  return cartCollection;
};
