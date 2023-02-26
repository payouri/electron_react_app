/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import { Item } from 'main/entities/Item/Item.types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'renderer/components/Button';
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
  const { register, handleSubmit } = useForm<Omit<Item, '_id'>>({
    defaultValues: {
      name: '',
      description: '',
      price: undefined,
      tags: [],
      urls: [],
      ...item,
    },
    shouldUseNativeValidation: true,
  });

  const loadSubmit = async (data: Omit<Item, '_id'>) => {
    if (loading) return;
    setLoading(true);

    try {
      await onSubmit(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit(loadSubmit)}>
      <InputWrapper>
        <InputLabel htmlFor="name">Item name</InputLabel>
        <Input
          {...register('name', {
            minLength: 2,
            required: true,
          })}
          placeholder="Item name"
        />
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
