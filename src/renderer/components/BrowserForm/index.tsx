import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { MessageType, sendMessage } from 'renderer/services';
import { Button } from '../Button';
import { Input } from '../Input';

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

  const {
    register,
    control,
    handleSubmit: onFormSubmit,
  } = useForm({
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
    </form>
  );
};
