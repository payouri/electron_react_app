import { useEffect, useState } from 'react';
import { sleep } from 'renderer/utils/sleep';
import { UseAppConfigState } from '../useAppConfig/types';
import { loadFonts } from './loaders/fonts';

export const useInitApp = ({
  config,
  loading: appConfigLoading,
}: UseAppConfigState) => {
  const [hasInit, setHasInit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const init = async () => {
    if (appConfigLoading || hasInit || isLoading) return;
    const start = Date.now();

    setIsLoading(true);
    try {
      await loadFonts();
    } catch (error) {
      console.error(error);
      await sleep(5000);
      await init();
    } finally {
      const loadTimeMS = Date.now() - start;
      if (loadTimeMS < config.minimumInitLoadTimeMS) {
        await sleep(config.minimumInitLoadTimeMS - loadTimeMS);
      }
      setHasInit(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasInit, isLoading, appConfigLoading, config?.minimumInitLoadTimeMS]);

  return {
    hasInit,
    isLoading: isLoading || appConfigLoading,
  };
};
