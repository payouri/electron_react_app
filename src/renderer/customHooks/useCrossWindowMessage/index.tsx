import { useEffect } from 'react';
import {
  MessageType,
  SenderMessage,
} from '../../../main/lib/MessageBridge/types';
import { CROSS_WINDOW_CHANNEL } from '../../../main/router/constants';
import { crossWindowRequestHandler } from '../../lib/crossWindowRequestHandler';
import { WindowType } from './types';
import { handleResponse } from './helpers/handleResponse';

export const useCrossWindowMessage = ({
  windowType,
}: {
  windowType: WindowType;
}) => {
  const handleRequest = crossWindowRequestHandler(windowType);

  const sendMessage = async (
    request: Omit<SenderMessage<string, unknown>, 'requestId' | 'type'>
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
