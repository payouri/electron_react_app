/* eslint-disable react/jsx-props-no-spreading */
import { Cart } from 'main/entities/Cart/Cart.types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'renderer/components/Button';
import styled from 'styled-components';

export type CreateCartFormProps = {
  onSubmit: (data: Omit<Cart, '_id'>) => Promise<void>;
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

export const CreateCartForm = ({ onSubmit }: CreateCartFormProps) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<Omit<Cart, '_id'>>({
    defaultValues: {
      name: '',
      items: [],
    },
    shouldUseNativeValidation: true,
  });

  const loadSubmit = async (data: Omit<Cart, '_id'>) => {
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
        <InputLabel htmlFor="name">Cart name</InputLabel>
        <input
          {...register('name', {
            minLength: 2,
            required: true,
          })}
          placeholder="Cart name"
        />
      </InputWrapper>
      <Button color="colorless" itemType="submit">
        Create
      </Button>
    </FormWrapper>
  );
};
