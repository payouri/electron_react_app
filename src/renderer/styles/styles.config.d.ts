/* eslint-disable @typescript-eslint/no-empty-interface */
import 'styled-components';

interface ITheme {
  colors: {
    primary: string;
    secondary: string;
  };
  iconSize: {
    sm: string;
    md: string;
    lg: string;
  };
  textSize: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };
  titleSize: {
    sm: string;
    md: string;
    lg: string;
  };
  grayscale: {
    0: string;
    10: string;
    20: string;
    30: string;
    40: string;
    50: string;
    60: string;
    70: string;
    80: string;
    90: string;
    100: string;
    110: string;
    120: string;
    130: string;
    140: string;
    150: string;
  };
  gap: {
    0: string;
    1: string;
    2: string;
    4: string;
    8: string;
    12: string;
    16: string;
    20: string;
    24: string;
    32: string;
    40: string;
    48: string;
    56: string;
    64: string;
  };
}

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}
