/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
import { SpinnerElement } from '../Spinner/Spinner';
import { getSpinnerProps } from './helpers/getSpinnerProps';
import { StyledButton } from './styles';
import { ButtonProps } from './types';

export type { ButtonProps } from './types';

export const Button: FC<ButtonProps> = ({
  color,
  size = 'medium',
  appendIcon,
  prependIcon,
  block,
  loading,
  disabled,
  minWidth,
  'aria-disabled': ariaDisabled,
  ...props
}) => {
  return (
    <StyledButton
      {...props}
      minWidth={minWidth}
      size={size}
      aria-disabled={ariaDisabled || disabled || loading}
      disabled={loading || disabled}
      color={color}
      block={block}
      loading={loading}
    >
      {loading ? (
        <SpinnerElement {...getSpinnerProps({ size })} />
      ) : (
        prependIcon
      )}
      {props.children ? (
        <span
          style={{
            flex: '0 0 auto',
          }}
        >
          {props.children}
        </span>
      ) : null}
      {appendIcon}
    </StyledButton>
  );
};
