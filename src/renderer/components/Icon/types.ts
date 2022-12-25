import { IconProps as UnIconProps } from '@iconscout/react-unicons';
import { IconMap } from './constants';

export enum IconSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export type IconName = keyof typeof IconMap;

export type IconProps = {
  name: IconName;
  size?: IconSize;
} & Omit<UnIconProps, 'size'>;
