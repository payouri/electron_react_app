/* eslint-disable react/jsx-props-no-spreading */
import { StyledButton } from './styles';
import { ButtonProps } from './types';

export type { ButtonProps } from './types';

export const Button = ({
  color,
  appendIcon,
  prependIcon,
  block,
  loading,
  disabled,
  'aria-disabled': ariaDisabled,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      {...props}
      aria-disabled={ariaDisabled || disabled || loading}
      disabled={loading || disabled}
      color={color}
      block={block}
    >
      {prependIcon}
      {props.children}
      {appendIcon}
    </StyledButton>
  );
};
