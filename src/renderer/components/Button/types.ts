import { HTMLAttributes, PropsWithChildren } from 'react';

export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'colorless'
  | 'transparent';

export type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonProps = PropsWithChildren<
  HTMLAttributes<HTMLButtonElement> & {
    color: ButtonColor;
    size: ButtonSize;
    disabled?: boolean;
    block?: boolean;
    prependIcon?: React.ReactNode;
    appendIcon?: React.ReactNode;
    loading?: boolean;
  }
>;

export type ButtonComponent = React.FC<ButtonProps>;
