import { createStorage, StorageType } from '../../lib/Storage';
import { DbStorageAPI } from '../../lib/Storage/DbStorage/types';
import { Tag } from './Tag.types';
import { tagSchema } from './Tag.zod';

const TAG_COLLECTION_NAME = 'tags';

let tagCollection: DbStorageAPI<Tag> | null = null;

export const createTagCollection = async (): Promise<DbStorageAPI<Tag>> =>
  createStorage<Tag>({
    name: TAG_COLLECTION_NAME,
    type: StorageType.DB,
    validator: async (value) => {
      try {
        const result = await tagSchema.safeParseAsync(value);
        return result;
      } catch (error) {
        return false;
      }
    },
  });

export const getTagCollection = async (): Promise<DbStorageAPI<Tag>> => {
  if (!tagCollection) {
    tagCollection = await createTagCollection();
  }

  return tagCollection;
};
