import { join } from 'path';
import { DB_ROOT_STORAGE_PATH } from '../constants';

export const generateDbStoragePath = (name: string): string => {
  return join(DB_ROOT_STORAGE_PATH, `${name}.json`);
};
