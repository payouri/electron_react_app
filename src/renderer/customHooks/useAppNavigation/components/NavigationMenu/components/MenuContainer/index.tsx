import styled from 'styled-components';
import { getStyleForMode } from './helpers/getStylesForMode';
import { MenuContainerProps } from './types';

export const MenuContainer = styled.div<MenuContainerProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap[16]};
  padding: ${({ theme }) => `${theme.gap[64]} 0 0 ${theme.gap[16]}`};
  overflow-x: hidden;
  ${getStyleForMode}
`;
