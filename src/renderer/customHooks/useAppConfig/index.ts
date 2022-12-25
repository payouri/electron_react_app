import { AppConfig } from 'main/config/types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MessageType, sendMessage } from 'renderer/services';
import { selectAppConfigState } from './selectors';
import { actions } from './slice';
import { UseAppConfigReturnType } from './types';

export const useAppConfig = (): UseAppConfigReturnType => {
  const state = useSelector(selectAppConfigState);
  const isLoaded = state.config !== null && !state.loading;
  const dispatch = useDispatch();

  const loadConfig = async () => {
    const response = await sendMessage({
      type: MessageType.GET_CONFIG,
      payload: undefined,
    });

    dispatch(
      actions.setConfigState({
        config: response,
        loading: false,
      })
    );
  };

  const reloadConfig = async () => {
    if (!isLoaded) return;

    dispatch(
      actions.setConfigState({
        config: null,
        loading: true,
      })
    );

    await loadConfig();
  };

  const updateConfig = async (config: Partial<AppConfig>) => {
    if (!isLoaded) return;

    await sendMessage({
      type: MessageType.SET_CONFIG_PROPERTY,
      payload: config,
    });

    dispatch(
      actions.setConfigState({
        config: { ...state.config, ...config },
        loading: false,
      })
    );
  };

  useEffect(() => {
    if (isLoaded) return;

    loadConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  return [
    state,
    {
      reloadConfig,
      updateConfig,
    },
  ];
};
