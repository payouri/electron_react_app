import { Button } from 'renderer/components/Button';
import styled from 'styled-components';

type NavigationButtonProps = { active: boolean };

export const NavigationButton = styled(Button)<NavigationButtonProps>`
  background-color: ${({ active, theme }) =>
    !active ? theme.grayscale[140] : theme.grayscale[10]} !important;
  color: ${({ active, theme }) =>
    !active ? theme.grayscale[10] : theme.grayscale[140]} !important;
`;

export const NavigationContainer = styled.div<{ mode: 'compact' | 'normal' }>`
  display: flex;
  gap: ${({ theme }) => theme.gap[16]};
  flex: ${({ mode }) => (mode === 'compact' ? '0 0 16rem' : '0 0 12rem')};
`;

export const SideMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 16rem;
  flex: 0 0 16rem;
`;
