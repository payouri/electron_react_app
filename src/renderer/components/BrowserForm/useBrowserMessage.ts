import {
  IncomingIPCMessage as BrowserMessage,
  InjectedAppsCrossWindowRequestType as BrowserRequestType,
  OutGoingIPCMessage as BrowserResponse,
} from '../../../main/injectApps/router/types';
import {
  MainWindowType,
  SecondaryWindowType,
} from '../../../main/lib/MessageBridge/types';
import { useCrossWindowMessage } from '../../customHooks/useCrossWindowMessage';

export { BrowserRequestType };

export const useBrowserMessage = () => {
  const { sendMessage: originalSendMessage } = useCrossWindowMessage({
    windowType: MainWindowType.DEFAULT,
  });

  const sendBrowserMessage = async <
    Message extends Pick<BrowserMessage, 'requestType' | 'payload'> & {
      noTimeout?: boolean;
    }
  >(
    message: Message,
    onError?: ({
      code,
      reason,
    }: {
      code: number | string;
      reason: string;
    }) => void
  ): Promise<
    Message['requestType'] extends infer R
      ? R extends BrowserRequestType
        ? BrowserResponse<R>
        : never
      : never
  > => {
    const response = await originalSendMessage(
      {
        ...message,
        recipientType: SecondaryWindowType.BROWSER,
        senderType: MainWindowType.DEFAULT,
      },
      onError
    );

    return response as any;
  };

  return { sendBrowserMessage };
};
