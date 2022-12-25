import { createStorage, StorageType } from '../../lib/Storage';
import { DbStorageAPI } from '../../lib/Storage/DbStorage/types';
import { Item } from './Item.types';
import { itemSchema } from './Item.zod';

const ITEM_COLLECTION_NAME = 'items';

let itemCollection: DbStorageAPI<Item> | null = null;

export const createItemCollection = async (): Promise<DbStorageAPI<Item>> =>
  createStorage<Item>({
    name: ITEM_COLLECTION_NAME,
    type: StorageType.DB,
    validator: async (value) => {
      try {
        const result = await itemSchema.safeParseAsync(value);
        return result;
      } catch (error) {
        return false;
      }
    },
  });

export const getItemCollection = async (): Promise<DbStorageAPI<Item>> => {
  if (!itemCollection) {
    itemCollection = await createItemCollection();
  }

  return itemCollection;
};
