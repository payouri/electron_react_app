import styled, { CSSProperties } from 'styled-components';

export const PageContainer = styled.div<{
  direction: Required<CSSProperties>['flexDirection'];
}>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  min-height: 100vh;
  width: 100%;
  gap: ${({ theme }) => theme.gap[16]};
  padding: ${({ theme }) => `${theme.gap[24]} 0`};
`;
