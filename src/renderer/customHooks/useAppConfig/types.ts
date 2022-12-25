import { AppConfig } from 'main/config/types';

export type UseAppConfigState =
  | {
      config: AppConfig;
      loading: false;
    }
  | {
      config: null;
      loading: true;
    };

export type UseAppConfigReturnType = [
  UseAppConfigState,
  {
    reloadConfig: () => Promise<void>;
    updateConfig: (config: Partial<AppConfig>) => Promise<void>;
  }
];
