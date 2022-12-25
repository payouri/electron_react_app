import styled from 'styled-components';
import { getButtonColor } from './helpers/getButtonColor';
import { ButtonProps } from './types';

type StyledButtonProps = Pick<ButtonProps, 'block' | 'color' | 'disabled'>;

export const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.gap[8]};
  width: ${({ block }) => (block ? '100%' : 'auto')};
  flex: ${({ block }) => (block ? 1 : 0)};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  font-size: ${({ theme }) => theme.textSize.md};
  white-space: nowrap;
  ${({ theme, color }) => {
    const { backgroundColor, color: textColor } = getButtonColor(theme, color);
    return `
      background-color: ${backgroundColor};
      color: ${textColor};
    `;
  }};
`;
