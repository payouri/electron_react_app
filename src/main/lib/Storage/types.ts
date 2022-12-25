import { DbStorageAPI } from './DbStorage/types';
import { FileStorageAPI } from './FileStorage/types';
import { StorageType } from './interfaces';

export type CreateStorageParamsMap<T extends Record<string, unknown>> = {
  [StorageType.DB]: Omit<
    DbStorageAPI<T>,
    'get' | 'set' | 'query' | 'generateId' | 'unset'
  >;
  [StorageType.FILE]: Omit<FileStorageAPI<T>, 'get' | 'set'>;
};

export type StorageTypeMap<T extends Record<string, unknown>> = {
  [StorageType.DB]: DbStorageAPI<T>;
  [StorageType.FILE]: FileStorageAPI<T>;
};

export type CreateStorageParams<
  T extends Record<string, unknown>,
  Type extends StorageType
> = CreateStorageParamsMap<T>[Type];

export type CreateStorageResult<T extends Record<string, unknown>> =
  | FileStorageAPI<T>
  | DbStorageAPI<T>;

export type CreateStorage<
  T extends Record<string, unknown>,
  Type extends StorageType
> = (params: CreateStorageParams<T, Type>) => Promise<CreateStorageResult<T>>;
