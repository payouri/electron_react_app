import { useCallback } from 'react';
import { useCrossWindowMessage } from '../../customHooks/useCrossWindowMessage';
import { SecondaryWindowType } from '../../customHooks/useCrossWindowMessage/types';
import { useAppsControllerState } from './state';
import { AppsControllerProps } from './types';

export const AppsController = ({
  pageNode,
  ...ipcRenderer
}: AppsControllerProps) => {
  const { dispatch } = useAppsControllerState();

  const onAppMount = useCallback(
    (appId: string) => {
      dispatch({
        type: 'APP_MOUNTED',
        payload: {
          appId,
        },
      });
    },
    [dispatch]
  );

  const onAppUnMount = useCallback(
    (appId: string) => {
      dispatch({
        type: 'APP_UNMOUNTED',
        payload: {
          appId,
        },
      });
    },
    [dispatch]
  );

  useCrossWindowMessage({
    onAppMount,
    onAppUnMount,
    pageNode,
    windowType: SecondaryWindowType.BROWSER,
    ipcRenderer,
  });

  return <></>;
};
