import { access, FileHandle, open } from 'fs/promises';
import { join } from 'path';
import { createDirectories } from '../../../helpers/createDirectories';
import { FILE_STORAGE_LOCATION } from './constants';
import { FileStorageAPI } from './types';

const createFileStorage = async <T extends Record<string, unknown>>({
  name,
  type,
  validator,
  pathToFile,
}: Omit<FileStorageAPI<T>, 'get' | 'set'>): Promise<FileStorageAPI<T>> => {
  const fileDirectory = join(FILE_STORAGE_LOCATION, pathToFile || '');

  if (!(await createDirectories(fileDirectory))) {
    throw new Error(`Could not create directory: ${fileDirectory}`);
  }

  try {
    await access(`${fileDirectory}/${name}.json`);
  } catch {
    const handle = await open(`${fileDirectory}/${name}.json`, 'w');
    await handle.close();
  }

  return {
    name,
    type,
    get: async () => {
      let file: FileHandle | undefined;
      try {
        file = await open(`${fileDirectory}/${name}.json`, 'r');

        const result = await file.readFile({
          encoding: 'utf-8',
        });

        const parsedResult = JSON.parse(result);

        return parsedResult;
      } catch (error) {
        return null;
      } finally {
        if (file) await file.close();
      }
    },
    set: async (value: T) => {
      let file: FileHandle | undefined;
      try {
        file = await open(`${fileDirectory}/${name}.json`, 'w');

        const isValid = await validator?.(value);
        if (isValid === false) {
          // TODO: Add error
          return false;
        }

        await file.writeFile(JSON.stringify(value), {
          encoding: 'utf-8',
        });
        return true;
      } catch (error) {
        console.error(error);
        return false;
      } finally {
        if (file) await file.close();
      }
    },
  };
};

export { createFileStorage };
