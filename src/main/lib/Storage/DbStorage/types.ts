import { MinimongoCollectionFindOptions } from 'minimongo';
import { StorageAPI, StorageType } from '../interfaces';

export interface DbStorageAPI<T extends Record<string, unknown>>
  extends StorageAPI<T> {
  type: StorageType.DB;
  frestStart?: boolean;
  set: (key: string, value: T) => Promise<boolean>;
  unset: (key: string) => Promise<boolean>;
  get: (key: string) => Promise<T | null>;
  query: (
    params: Pick<MinimongoCollectionFindOptions, 'skip' | 'limit' | 'sort'> & {
      filter: { [K in keyof T]?: any };
    }
  ) => Promise<T[]>;
  generateId: () => string;
}
