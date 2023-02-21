import { fileLogger } from '../../Logger';
import { DBStorageNameAlreadyTaken } from './errors';
import { generateUniqueDbItemId } from './helpers/generateUniqueItemId';
import { getLocalDb } from './main';
import { loadCollectionFromDisk } from './main/persistence';
import { DbStorageAPI } from './types';

const createDBStorage = async <T extends Record<string, unknown>>({
  name,
  type,
  validator,
  frestStart,
}: Omit<
  DbStorageAPI<T>,
  'get' | 'set' | 'query' | 'generateId' | 'unset' | 'on' | 'off' | 'emit'
>): Promise<DbStorageAPI<T>> => {
  const localDb = getLocalDb();

  if (name in localDb.collections) {
    throw new DBStorageNameAlreadyTaken(name);
  }

  const collectionData = frestStart
    ? { name, items: {} }
    : await loadCollectionFromDisk(name);

  localDb.addCollection(name);

  await new Promise<void>((resolve) => {
    localDb.collections[name].seed(
      Object.values(collectionData.items),
      resolve
    );
  });

  return {
    name,
    type,
    query: async ({ filter, ...query }) => {
      const result = localDb.collections[name].find(filter, query);

      return new Promise((resolve, reject) => {
        result.fetch((data: T[], error: Error) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      });
    },
    get: async (key: string) => {
      try {
        const result = await localDb.collections[name].findOne({
          _id: key,
        });
        return result;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    set: async (key: string, value: T) => {
      try {
        const isValid = await validator?.(value);

        if (
          isValid === false ||
          (typeof isValid === 'object' &&
            'success' in isValid &&
            !isValid.success)
        ) {
          // TODO: Add error
          fileLogger.error('Invalid value', {
            key,
            value,
            isValid,
            collectionName: name,
          });
          return false;
        }

        await localDb.collections[name].upsert(
          {
            _id: key,
            ...value,
          },
          {
            _id: key,
          }
        );

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    unset: async (key: string) => {
      try {
        await localDb.collections[name].remove({
          _id: key,
        });
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    generateId: () => generateUniqueDbItemId(localDb.collections[name]),
  };
};

export { createDBStorage };
