import styled, { CSSProperties } from 'styled-components';

// export const Iframe = styled.webview`
//   /* width: 100%;
//   height: 100%; */
//   display: block;
//   border: none;
// `;

export const IframeContainer = styled.div<{
  flex: CSSProperties['flex'];
  height: string | number;
  width: string | number;
}>`
  max-width: 100%;
  max-height: 100%;
  flex: ${({ flex }) => flex};
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
  overflow: hidden;
`;
