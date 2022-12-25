import { StorageAPI, StorageType } from '../interfaces';

export interface FileStorageAPI<T extends Record<string, unknown>>
  extends StorageAPI<T> {
  type: StorageType.FILE;
  pathToFile?: string;
  get: () => Promise<T | null>;
  set: (value: T) => Promise<boolean>;
}
