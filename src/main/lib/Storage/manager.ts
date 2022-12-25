import { StorageAPI, StorageType } from './interfaces';

const symbolCollection = new Map<`${StorageType}/${string}`, symbol>();
const storagesMap = new WeakMap<{ storageSymbol: symbol }, StorageAPI<any>>();

export function getStorage<
  Type extends StorageType = StorageType,
  StorageName extends string = string
>(params: {
  name: StorageName;
  type: Type;
}): StorageAPI<Record<string, unknown>> | undefined {
  const storageSymbol = symbolCollection.get(`${params.type}/${params.name}`);

  if (!storageSymbol) {
    return undefined;
  }

  return storagesMap.get({ storageSymbol });
}

export const setStorage = <Storage extends StorageAPI<any>>(
  storage: Storage
): void => {
  const storageSymbol = Symbol(storage.name);
  symbolCollection.set(`${storage.type}/${storage.name}`, storageSymbol);
  storagesMap.set({ storageSymbol }, storage);
};
