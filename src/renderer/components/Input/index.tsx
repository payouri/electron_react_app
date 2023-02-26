/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useMemo } from 'react';
import { CustomInput } from './styles';
import { InputProps } from './types';

export const Input = ({ children, border, ...props }: InputProps) => {
  const inputId = useMemo(
    () => props.id || props.name || 'input',
    [props.id, props.name]
  );

  return (
    <label
      htmlFor={inputId}
      style={{ display: 'flex', border: border || '1px solid transparent' }}
    >
      <CustomInput id={inputId} {...props} />
    </label>
  );
};
