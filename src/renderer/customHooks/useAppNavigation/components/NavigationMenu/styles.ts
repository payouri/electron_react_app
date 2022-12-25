import { Button } from 'renderer/components/Button';
import styled from 'styled-components';

type NavigationButtonProps = { active: boolean };

export const NavigationButton = styled(Button)<NavigationButtonProps>`
  background-color: ${({ active, theme }) =>
    !active ? theme.grayscale[140] : theme.grayscale[10]} !important;
  color: ${({ active, theme }) =>
    !active ? theme.grayscale[10] : theme.grayscale[140]} !important;
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap[16]};
  padding: ${({ theme }) => `${theme.gap[64]} ${theme.gap[16]} 0`};
  flex: 0 0 12rem;
  overflow-x: hidden;
`;
