import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { MessageType, sendMessage } from 'renderer/services';
import { Button } from '../Button';
import { Input } from '../Input';
import { useBrowserMessage } from './useBrowserMessage';
import {
  IncomingIPCMessage as BrowserMessage,
  InjectedAppsCrossWindowRequestType as BrowserRequestType,
  OutGoingIPCMessage as BrowserResponse,
} from '../../../main/injectApps/router/types';

const SendHealthCheckButton = () => {
  const [loading, setLoading] = useState(false);
  const { sendBrowserMessage } = useBrowserMessage();

  const handleClick = async () => {
    setLoading(true);
    try {
      await sendBrowserMessage({
        requestType: BrowserRequestType.HEALTH_CHECK,
        payload: undefined,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      loading={loading}
      size="medium"
      color="colorless"
      onClick={handleClick}
    >
      Send Health Check
    </Button>
  );
};

export const BrowserForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: { url: string }) => {
    setLoading(true);
    try {
      await sendMessage({
        type: MessageType.OPEN_BROWSER,
        payload: {
          url: data.url,
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const { control, handleSubmit: onFormSubmit } = useForm({
    defaultValues: {
      url: 'https://www.google.com',
    },
    shouldUseNativeValidation: true,
  });

  return (
    <form onSubmit={onFormSubmit(handleSubmit)}>
      <Controller
        name="url"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <Input
            {...field}
            disabled={loading}
            type="url"
            placeholder='Enter a URL, e.g. "https://www.google.com"'
          />
        )}
      />
      <Button loading={loading} size="medium" color="colorless" type="submit">
        Go
      </Button>
      <SendHealthCheckButton />
    </form>
  );
};
