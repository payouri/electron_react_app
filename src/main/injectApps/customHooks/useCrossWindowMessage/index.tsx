import { useCallback, useEffect, useRef } from 'react';
import { CROSS_WINDOW_CHANNEL } from '../../../router/constants';
import { crossWindowRequestHandler } from '../../lib/crossWindowRequestHandler';
import { IPC_API } from '../../types';
import { handleResponse } from './helpers/handleResponse';
import { MessageType, SenderMessage, WindowType } from './types';

export const useCrossWindowMessage = ({
  onAppMount,
  onAppUnMount,
  pageNode,
  windowType,
  ipcRenderer,
}: {
  windowType: WindowType;
  pageNode: Element;
  onAppMount: (appId: string) => void;
  onAppUnMount: (appId: string) => void;
  ipcRenderer: IPC_API;
}) => {
  const microAppMountNode = useRef(document.createElement('div'));

  const sendMessage = useCallback(
    async (
      request: Omit<SenderMessage<string, unknown>, 'requestId' | 'type'>
    ) => {
      const response = await ipcRenderer.sendCrossWindowRequest({
        ...request,
        requestId: Math.random().toString(),
        type: MessageType.REQUEST,
      });

      return handleResponse(response);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ipcRenderer.sendCrossWindowRequest]
  );

  useEffect(
    () => {
      const { current: currentMicroAppMountNode } = microAppMountNode;

      const handleRequest = crossWindowRequestHandler(windowType)({
        microAppMountNode: currentMicroAppMountNode,
        onAppMount,
        onAppUnMount,
        pageNode,
      });

      const messageHandler = async (request: unknown) => {
        const response = await handleRequest(request);

        if (!response) {
          return;
        }

        ipcRenderer.sendCrossWindowResponse(response);
      };

      const onBeforeUnload = () => {
        ipcRenderer.off(CROSS_WINDOW_CHANNEL, messageHandler);
      };

      ipcRenderer.on(CROSS_WINDOW_CHANNEL, messageHandler);
      window.addEventListener('beforeunload', onBeforeUnload);

      return () => {
        ipcRenderer.off(CROSS_WINDOW_CHANNEL, messageHandler);
        document.body.removeChild(currentMicroAppMountNode);
        window.removeEventListener('beforeunload', onBeforeUnload);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onAppMount, onAppUnMount, pageNode, windowType]
  );

  return { sendMessage };
};
