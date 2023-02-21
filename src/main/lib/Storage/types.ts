import { DbStorageAPI, DBEmitter } from './DbStorage/types';
import { FileStorageAPI } from './FileStorage/types';
import { StorageType } from './interfaces';

export type StorageTypeEmitterMap<Item> = {
  [StorageType.DB]: DBEmitter<Item>;
  [StorageType.FILE]: {
    fileCreated: (item: Item) => void;
    fileUpdated: (item: Item) => void;
    fileRemoved: (item: Item) => void;
  };
};

export type CreateStorageParamsMap<T extends Record<string, unknown>> = {
  [StorageType.DB]: Omit<
    DbStorageAPI<T>,
    'get' | 'set' | 'query' | 'generateId' | 'unset' | 'on' | 'off' | 'emit'
  >;
  [StorageType.FILE]: Omit<FileStorageAPI<T>, 'get' | 'set'>;
};

export type StorageTypeMap<T extends Record<string, unknown>> = {
  [StorageType.DB]: DbStorageAPI<T>;
  [StorageType.FILE]: FileStorageAPI<T>;
};

export type CreateStorageParams<
  Item extends Record<string, unknown>,
  Type extends StorageType
> = CreateStorageParamsMap<Item>[Type];

export type CreateStorageResult<T extends Record<string, unknown>> =
  | FileStorageAPI<T>
  | DbStorageAPI<T>;

export type CreateStorage<
  T extends Record<string, unknown>,
  Type extends StorageType
> = (params: CreateStorageParams<T, Type>) => Promise<CreateStorageResult<T>>;
