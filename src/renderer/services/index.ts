import { IPC_ROUTER_CHANNEL } from 'main/router/constants';
import { nanoid } from 'nanoid';
import { isValidReponseMessage } from './helpers/isValidReponseMessage';
import { Message, MessageType, Response } from './types';

export { MessageType };

const generateMessageId = () => nanoid(12);

const ongoingRequests = new Map<string, (params: any) => void>();

const responseHandler = (response: unknown) => {
  if (!isValidReponseMessage(response)) {
    console.error('Invalid response message', response);
    return;
  }

  const callback = ongoingRequests.get(
    `${response.type}/${response.requestId}`
  );

  if (!callback) {
    console.error('No callback for response', response);
    return;
  }

  callback(response.payload);
};

window.electron.ipcRenderer.on(IPC_ROUTER_CHANNEL, responseHandler);

export const sendMessage = <Type extends MessageType>(
  message: Omit<Message<Type>, 'requestId'>
): Promise<Response<Type>> => {
  const requestId = generateMessageId();

  ongoingRequests.set(`${message.type}/${requestId}`, () => {});

  const promise = new Promise<Response<Type>>((resolve, reject) => {
    let hasResolved = false;
    const timeout = setTimeout(() => {
      if (hasResolved) return;
      hasResolved = true;
      ongoingRequests.delete(`${message.type}/${requestId}`);
      reject(new Error('Request timed out'));
    }, 5000);

    const callback = (params: Response<Type>) => {
      if (hasResolved) return;
      hasResolved = true;
      clearTimeout(timeout);
      resolve(params);
    };

    ongoingRequests.set(`${message.type}/${requestId}`, callback);
  });

  window.electron.ipcRenderer.sendMessage(IPC_ROUTER_CHANNEL, [
    Object.assign(message, { requestId }),
  ]);

  return promise;
};
