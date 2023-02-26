import styled, { CSSProperties } from 'styled-components';

export const PageHeaderContainer = styled.div<{
  actionsPosition: 'top' | 'bottom' | 'left' | 'right';
  actionAlignment?: CSSProperties['alignItems'];
  actionJustification?: CSSProperties['justifyContent'];
}>`
  display: flex;
  padding-right: ${({ theme }) => theme.gap[16]};
  flex-direction: ${({ actionsPosition }) => {
    if (actionsPosition === 'bottom') return 'column';
    if (actionsPosition === 'top') return 'column-reverse';
    if (actionsPosition === 'left') return 'row-reverse';
    return 'row';
  }};
  gap: ${({ theme }) => theme.gap[12]};
  align-items: ${({ actionAlignment, actionsPosition }) => {
    if (actionAlignment) return actionAlignment;
    if (actionsPosition === 'bottom' || actionsPosition === 'top') {
      return 'flex-start';
    }
    return 'center';
  }};
  justify-content: ${({ actionJustification, actionsPosition }) => {
    if (actionJustification) return actionJustification;
    if (actionsPosition === 'bottom' || actionsPosition === 'top') {
      return 'center';
    }
    if (actionsPosition === 'left') return 'flex-end';
    return 'flex-start';
  }};
`;

export const PageSubtitle = styled.h2`
  font-size: ${({ theme }) => theme.titleSize.sm};
`;

export const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.titleSize.md};
`;
