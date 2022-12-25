import { HTMLAttributes, PropsWithChildren } from 'react';

export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'colorless'
  | 'transparent';

export type ButtonProps = PropsWithChildren<
  HTMLAttributes<HTMLButtonElement> & {
    color: ButtonColor;
    disabled?: boolean;
    block?: boolean;
    prependIcon?: React.ReactNode;
    appendIcon?: React.ReactNode;
    loading?: boolean;
  }
>;
