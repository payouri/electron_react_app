import { createStorage, StorageType } from '../../lib/Storage';
import { DbStorageAPI } from '../../lib/Storage/DbStorage/types';
import { Profile } from './Profile.types';
import { profileSchema } from './Profile.zod';

const PROFILE_COLLECTION_NAME = 'profiles';

let profileCollection: DbStorageAPI<Profile> | null = null;

export const createProfileCollection = async (): Promise<
  DbStorageAPI<Profile>
> =>
  createStorage<Profile>({
    name: PROFILE_COLLECTION_NAME,
    type: StorageType.DB,
    validator: async (value) => {
      try {
        const result = await profileSchema.safeParseAsync(value);
        return result;
      } catch (error) {
        return false;
      }
    },
  });

export const getProfileCollection = async (): Promise<
  DbStorageAPI<Profile>
> => {
  if (!profileCollection) {
    profileCollection = await createProfileCollection();
  }

  return profileCollection;
};
