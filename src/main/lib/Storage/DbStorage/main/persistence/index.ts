import { open } from 'fs/promises';
import { MemoryDb } from 'minimongo';
import { createDirectories } from '../../../../../helpers/createDirectories';
import { DB_ROOT_STORAGE_PATH } from './constants';
import { generateDbStoragePath } from './helpers/generateDbStoragePath';

type DbInstance = MemoryDb;

export const saveCollectionToDisk = async (
  collection: DbInstance['collections'][string]
) => {
  const { name, items } = collection;

  if (!(await createDirectories(DB_ROOT_STORAGE_PATH))) {
    throw new Error(`Could not create directory: ${DB_ROOT_STORAGE_PATH}`);
  }

  const handle = await open(generateDbStoragePath(name), 'w');

  await handle.writeFile(
    JSON.stringify({
      name,
      items: { ...items },
    }),
    {
      encoding: 'utf-8',
    }
  );

  await handle.close();
};

export const loadCollectionFromDisk = async (
  collectionName: string
): Promise<{
  name: string;
  items: DbInstance['collections'][string]['items'];
}> => {
  try {
    const handle = await open(generateDbStoragePath(collectionName), 'r');

    const result = await handle.readFile({
      encoding: 'utf-8',
    });

    await handle.close();

    const parsedResult = JSON.parse(result);

    return parsedResult;
  } catch (error) {
    return {
      name: collectionName,
      items: [],
    };
  }
};
