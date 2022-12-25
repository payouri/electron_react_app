import { AppConfig } from './types';

export const TAG_DEFAULT_COLOR = 'teal';

export const CONGIF_PERSISTENCE_DIR = 'config';

export const APP_CONFIG_STORAGE_NAME = 'app_config';

export const DEFAULT_APP_CONFIG: AppConfig = {
  test: 'test',
  tagDefaultColor: TAG_DEFAULT_COLOR,
  minimumInitLoadTimeMS: 5000,
};
