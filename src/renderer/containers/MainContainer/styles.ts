import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  width: 100%;
  gap: ${({ theme }) => theme.gap[16]};
  padding: ${({ theme }) => `${theme.gap[24]} 0`};
`;
