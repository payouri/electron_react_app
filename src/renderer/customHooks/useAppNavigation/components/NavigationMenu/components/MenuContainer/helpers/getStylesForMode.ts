import { css } from 'styled-components';
import { MenuContainerProps } from '../types';

export const getStyleForMode = ({
  mode,
}: {
  mode: MenuContainerProps['mode'];
}) => {
  if (mode === 'compact') {
    return css`
      flex: 1 0 4rem;
    `;
  }

  return css`
    flex: 0 0 12rem;
  `;
};
