import { SafeParseReturnType } from 'zod';

export enum StorageType {
  DB = 'DB',
  FILE = 'FILE',
}

type GetFunction<Result extends Record<string, unknown>> =
  | ((key: string) => Promise<Result | null>)
  | (() => Promise<Result | null>);
type SetFunction<Result extends Record<string, unknown>> =
  | ((key: string, value: Result) => Promise<boolean>)
  | ((value: Result) => Promise<boolean>);

export interface StorageAPI<T extends Record<string, unknown>> {
  name: string;
  type: StorageType;
  validator?: (value: T) => Promise<boolean | SafeParseReturnType<any, T>>;
  get: GetFunction<T>;
  set: SetFunction<T>;
}
