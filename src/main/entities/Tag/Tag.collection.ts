import { createStorage, StorageType, StorageTypeMap } from '../../lib/Storage';
import { Tag } from './Tag.types';
import { tagSchema } from './Tag.zod';

const TAG_COLLECTION_NAME = 'tags';

let tagCollection: StorageTypeMap<Tag>[StorageType.DB] | null = null;

export const createTagCollection = async (): Promise<
  StorageTypeMap<Tag>[StorageType.DB]
> =>
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

export const getTagCollection = async (): Promise<
  StorageTypeMap<Tag>[StorageType.DB]
> => {
  if (!tagCollection) {
    tagCollection = await createTagCollection();
  }

  return tagCollection;
};
