import { createStorage, StorageType, StorageTypeMap } from '../lib/Storage';
import {
  APP_CONFIG_STORAGE_NAME,
  CONGIF_PERSISTENCE_DIR,
  DEFAULT_APP_CONFIG,
} from './constants';
import { AppConfig } from './types';

let configStorage: StorageTypeMap<AppConfig>[StorageType.FILE] | null = null;

export const getConfig = async (): Promise<AppConfig> => {
  if (!configStorage) {
    configStorage = await createStorage<AppConfig>({
      name: APP_CONFIG_STORAGE_NAME,
      type: StorageType.FILE,
      pathToFile: CONGIF_PERSISTENCE_DIR,
    });
  }

  const config = await configStorage.get();

  if (!config) {
    await configStorage.set(DEFAULT_APP_CONFIG);

    return DEFAULT_APP_CONFIG;
  }

  return { ...DEFAULT_APP_CONFIG, ...config };
};

export const saveConfig = async (config: AppConfig): Promise<boolean> => {
  if (!configStorage) {
    configStorage = await createStorage<AppConfig>({
      name: APP_CONFIG_STORAGE_NAME,
      type: StorageType.FILE,
      pathToFile: CONGIF_PERSISTENCE_DIR,
    });
  }

  return configStorage.set(config);
};
