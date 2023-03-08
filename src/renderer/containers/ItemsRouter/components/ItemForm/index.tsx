/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import { Item } from 'main/entities/Item/Item.types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  BrowserRequestType,
  useBrowserMessage,
} from 'renderer/components/BrowserForm/useBrowserMessage';
import { Button } from 'renderer/components/Button';
import { Icon } from 'renderer/components/Icon';
import { Input } from 'renderer/components/Input';
import styled from 'styled-components';

export type ItemFormProps = {
  item?: Item;
  onSubmit: (data: Omit<Item, '_id'>) => Promise<void>;
};

export const InputLabel = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.grayscale[20]};
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap[4]};
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap[8]};
  > :last-child {
    margin-top: ${({ theme }) => theme.gap[8]};
  }
`;

export const ItemForm = ({ item, onSubmit }: ItemFormProps) => {
  const [loading, setLoading] = useState(false);
  const [hasUrl, setHasUrl] = useState(!!item?.urls.length);
  const { sendBrowserMessage } = useBrowserMessage();

  const {
    register,
    handleSubmit,
    formState: { dirtyFields, defaultValues, errors },
    setError,
  } = useForm<Omit<Item, '_id' | 'urls'> & { url: string }>({
    defaultValues: item
      ? {
          name: item.name,
          description: item.description,
          price: item.price,
          tags: item.tags,
          url: item.urls[0],
        }
      : {
          name: '',
          description: '',
          price: undefined,
          tags: [],
          url: '',
        },
    shouldUseNativeValidation: true,
  });

  const handleOpenBrowser =
    (field: keyof (Omit<Item, '_id' | 'urls'> & { url: string })) =>
    async (elementType: 'image' | 'link' | 'number' | 'text') => {
      try {
        const response = await sendBrowserMessage(
          {
            requestType: BrowserRequestType.RENDER_COMPONENT,
            payload: {
              type: 'element_picker',
              props: {
                elementType,
              },
            },
            noTimeout: true,
          },
          ({ code, reason }) => {
            setError(field, {
              message: `${code}: ${reason}`,
            });
          }
        );
      } catch (error) {
        if (
          error &&
          typeof error === 'object' &&
          'error' in error &&
          !!error.error &&
          typeof error.error === 'object' &&
          'code' in error.error &&
          'reason' in error.error
        ) {
          setError(field, {
            message: `${error.error.code}: ${error.error.reason}`,
          });
        } else {
          setError(field, {
            message: `Error: ${JSON.stringify(error)}`,
          });
        }
      }
    };

  const loadSubmit = async (data: Omit<Item, '_id'>) => {
    if (loading) return;
    setLoading(true);

    try {
      await onSubmit(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const newHasUrl = !!dirtyFields.url || !!defaultValues?.url;
    if (newHasUrl !== hasUrl) setHasUrl(newHasUrl);
  }, [dirtyFields.url, defaultValues?.url, hasUrl]);

  return (
    <FormWrapper
      onSubmit={handleSubmit(({ url, ...data }) => {
        loadSubmit({
          ...data,
          urls: url ? [url] : [],
        });
      })}
    >
      <InputWrapper>
        <InputLabel htmlFor="url">Item URL</InputLabel>
        <Input
          type="url"
          {...register('url', {
            required: false,
          })}
        />
      </InputWrapper>
      <InputWrapper>
        <InputLabel htmlFor="name">Item name</InputLabel>
        <Input
          {...register('name', {
            minLength: 2,
            required: true,
          })}
          placeholder="Item name"
          addonAfter={
            <Button
              color="colorless"
              size="small"
              type="button"
              disabled={!hasUrl}
              onClick={() => {
                handleOpenBrowser('name')('text');
              }}
            >
              <Icon name="crosshair" />
            </Button>
          }
        />
        {errors.name ? (
          <span role="alert">
            {errors.name.type === 'required' && 'This field is required'}
            {errors.name.type === 'minLength' &&
              'This field must be at least 2 characters'}
            {!errors.name.type && errors.name.message}
          </span>
        ) : null}
      </InputWrapper>
      <InputWrapper>
        <InputLabel htmlFor="description">Item description</InputLabel>
        <textarea {...register('description')} placeholder="Item description" />
      </InputWrapper>
      <InputWrapper>
        <InputLabel htmlFor="price">Item price</InputLabel>
        <Input
          {...register('price', {
            min: 0,
            valueAsNumber: true,
          })}
          type="number"
          step="0.01"
          placeholder="e.g. 10.99"
        />
      </InputWrapper>
      <Button size="medium" color="colorless" itemType="submit">
        {item?._id ? 'Edit' : 'Create'}
      </Button>
    </FormWrapper>
  );
};
