import styled from 'styled-components';
import { LoaderProps } from './types';

export const LoaderContainer = styled.div<Pick<LoaderProps, 'fillSpace'>>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ fillSpace }) => (fillSpace ? '100%' : 'max-content')};
  width: ${({ fillSpace }) => (fillSpace ? '100%' : 'max-content')};
  align-self: ${({ fillSpace }) => (fillSpace ? 'center' : 'auto')};
`;

export const LoadingIndicator = styled.div<Pick<LoaderProps, 'color' | 'size'>>`
  display: block;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
  border: ${({ theme }) => theme.gap[4]} solid
    ${({ color }) => color || 'currentColor'};
  border-right-color: transparent;

  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    0%,
    15% {
      transform: rotate(0turn);
    }
    85%,
    100% {
      transform: rotate(1turn);
    }
  }
`;
