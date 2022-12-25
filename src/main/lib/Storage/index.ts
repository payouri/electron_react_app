import { createDBStorage } from './DbStorage';
import { createFileStorage } from './FileStorage';
import { StorageType } from './interfaces';
import { getStorage, setStorage } from './manager';
import {
  CreateStorageParams,
  CreateStorageResult,
  StorageTypeMap,
} from './types';

export { StorageType, StorageTypeMap };

export async function createStorage<T extends Record<string, unknown>>(
  params: CreateStorageParams<T, StorageType.FILE> & { type: StorageType.FILE }
): Promise<StorageTypeMap<T>['FILE']>;
export async function createStorage<T extends Record<string, unknown>>(
  params: CreateStorageParams<T, StorageType.DB> & { type: StorageType.DB }
): Promise<StorageTypeMap<T>['DB']>;
export async function createStorage<T extends Record<string, unknown>>(
  params: CreateStorageParams<T, StorageType>
): Promise<CreateStorageResult<T>> {
  const { type: storageType, name, validator } = params;

  if (storageType === StorageType.FILE) {
    const existingStorage = getStorage({
      name,
      type: storageType,
    });
    if (existingStorage) return existingStorage as StorageTypeMap<T>['FILE'];

    const newStorage = await createFileStorage<T>({
      ...params,
      name,
      type: storageType,
      validator,
    });

    setStorage(newStorage);

    return newStorage;
  }
  if (storageType === StorageType.DB) {
    const existingStorage = getStorage({
      name,
      type: storageType,
    });
    if (existingStorage) return existingStorage as StorageTypeMap<T>['DB'];

    const newStorage = await createDBStorage<T>({
      ...params,
      name,
      type: storageType,
      validator,
    });

    setStorage(newStorage);
    return newStorage;
  }
  throw new Error(`Unknown storage type: ${storageType}`);
}
