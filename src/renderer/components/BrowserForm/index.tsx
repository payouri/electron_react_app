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

/**
 * The following code is used to send a health check request to the browser.
 * The response is then used to determine whether or not the browser is
 * currently alive.
 */
const SendHealthCheckButton = () => {
  const [loading, setLoading] = useState(false);
  const { sendBrowserMessage } = useBrowserMessage();

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await sendBrowserMessage({
        requestType: BrowserRequestType.HEALTH_CHECK,
        payload: undefined,
      });
      if (response) {
        if (!response.hasFailed && response.payload.isAlive) {
          console.log('Browser health check successful');
        } else {
          console.error('Browser health check failed');
        }
      } else {
        console.error('Browser health check failed');
      }
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

// This function is used to render the form that allows users to open a URL in the browser.
export const BrowserForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = async (data: { url: string }) => {
    setLoading(true);
    try {
      await sendMessage({
        type: MessageType.OPEN_BROWSER,
        payload: {
          url: data.url,
        },
      });
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error('Something went wrong'));
      }
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
      {error && (
        <div
          style={{
            color: '#f44336',
            fontSize: '0.9rem',
            fontWeight: 700,
            marginTop: '1.2rem',
          }}
        >
          {error.message}
        </div>
      )}
      <Button loading={loading} size="medium" color="colorless" type="submit">
        Go
      </Button>
      <SendHealthCheckButton />
    </form>
  );
};
