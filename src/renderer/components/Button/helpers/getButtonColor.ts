import { DefaultTheme } from 'styled-components';
import { ButtonColor } from '../types';

export const getButtonColor = (
  theme: DefaultTheme,
  color: ButtonColor
): { backgroundColor: string; color: string } => {
  switch (color) {
    case 'transparent':
      return {
        backgroundColor: 'transparent',
        color: theme.grayscale[10],
      };
    case 'primary':
    case 'secondary':
    case 'tertiary':
    case 'colorless':
    default:
      return {
        backgroundColor: theme.grayscale[140],
        color: theme.grayscale[10],
      };
  }
};
