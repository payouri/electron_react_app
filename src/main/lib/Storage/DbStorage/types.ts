import { MinimongoCollectionFindOptions } from 'minimongo';
import { StorageAPI, StorageType } from '../interfaces';

export type DBEmitter<Item> = {
  itemAdded: (item: Item) => void;
  itemUpdated: (item: Item) => void;
  itemRemoved: (item: Item) => void;
};

export interface DBStorageEmitter<Item> {
  on: <Event extends keyof DBEmitter<Item>>(
    event: Event,
    listener: DBEmitter<Item>[Event]
  ) => void;
  off: <Event extends keyof DBEmitter<Item>>(
    event: Event,
    listener: DBEmitter<Item>[Event]
  ) => void;
  emit: <Event extends keyof DBEmitter<Item>>(
    event: Event,
    ...args: Parameters<DBEmitter<Item>[Event]>
  ) => void;
}

type Path<T, Key extends keyof T = keyof T> = Key extends string
  ? T[Key] extends Record<string, unknown>
    ?
        | `${Key}.${Path<T[Key], Exclude<keyof T[Key], keyof Array<unknown>>> &
            string}`
        | `${Key}.${Exclude<keyof T[Key], keyof Array<unknown>> & string}`
        | Key
    : never
  : Key;

export interface DbStorageAPI<T extends Record<string, unknown>>
  extends StorageAPI<T>,
    DBStorageEmitter<T> {
  type: StorageType.DB;
  frestStart?: boolean;
  set: (key: string, value: T) => Promise<boolean>;
  unset: (key: string) => Promise<boolean>;
  get: (key: string) => Promise<T | null>;
  query: (
    params: Pick<MinimongoCollectionFindOptions, 'skip' | 'limit' | 'sort'> & {
      filter: { [K in keyof Path<T>]?: any };
    }
  ) => Promise<T[]>;
  generateId: () => string;
}
