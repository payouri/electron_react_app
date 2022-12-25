import { DefaultTheme } from 'styled-components';
import { IconSize } from '../types';

export const getIconSize = (theme: DefaultTheme, size: IconSize): string => {
  switch (size) {
    case IconSize.SMALL:
      return theme.iconSize.sm;
    case IconSize.MEDIUM:
      return theme.iconSize.md;
    case IconSize.LARGE:
    default:
      return theme.iconSize.lg;
  }
};
