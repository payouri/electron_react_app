import { createStorage, StorageType } from '../../lib/Storage';
import { DbStorageAPI } from '../../lib/Storage/DbStorage/types';
import { Category } from './Category.types';
import { categorySchema } from './Category.zod';

const CATEGORY_COLLECTION_NAME = 'categories';

let categoryCollection: DbStorageAPI<Category> | null = null;

export const createCategoryCollection = async (): Promise<
  DbStorageAPI<Category>
> =>
  createStorage<Category>({
    name: CATEGORY_COLLECTION_NAME,
    type: StorageType.DB,
    validator: async (value) => {
      try {
        const result = await categorySchema.safeParseAsync(value);
        return result;
      } catch (error) {
        return false;
      }
    },
  });

export const getCategoryCollection = async (): Promise<
  DbStorageAPI<Category>
> => {
  if (!categoryCollection) {
    categoryCollection = await createCategoryCollection();
  }

  return categoryCollection;
};
