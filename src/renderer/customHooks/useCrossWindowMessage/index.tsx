import { useEffect } from 'react';
import {
  MessageType,
  SenderMessage,
  WindowType,
} from '../../../main/lib/MessageBridge/types';
import { CROSS_WINDOW_CHANNEL } from '../../../main/router/constants';
import { crossWindowRequestHandler } from '../../lib/crossWindowRequestHandler';
import { handleResponse } from './helpers/handleResponse';

type Params = {
  windowType: WindowType;
};

export const useCrossWindowMessage = <
  Type extends string = string,
  ResponseType extends unknown = unknown
>({
  windowType,
}: Params) => {
  const handleRequest = crossWindowRequestHandler(windowType);

  const sendMessage = async (
    request: Omit<SenderMessage<Type, ResponseType>, 'requestId' | 'type'>
  ) => {
    const response = await window.electron.ipcRenderer.sendCrossWindowRequest({
      ...request,
      requestId: Math.random().toString(),
      type: MessageType.REQUEST,
    });

    return handleResponse(response);
  };

  useEffect(() => {
    window.electron.ipcRenderer.on(CROSS_WINDOW_CHANNEL, async (request) => {
      const response = await handleRequest(request);

      if (!response) {
        return;
      }

      window.electron.ipcRenderer.sendCrossWindowResponse(response);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { sendMessage };
};
