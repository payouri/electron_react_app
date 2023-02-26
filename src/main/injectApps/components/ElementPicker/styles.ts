import styled, { CSSProperties } from 'styled-components';

export const ElementPickerContainer = styled.div.attrs<{
  top?: CSSProperties['top'];
  left?: CSSProperties['left'];
}>(({ left, top, style }) => ({
  style: {
    ...style,
    left,
    top,
  },
}))<{
  top?: CSSProperties['top'];
  left?: CSSProperties['left'];
}>`
  position: absolute;
  transition: all 0.2s linear forwards;
  will-change: left, top;
  box-shadow: ${({ theme }) => theme.boxShadow.elevation[12]};
  min-width: 18rem;
  max-width: 18rem;
  padding: 0.5rem;
  z-index: ${({ theme }) => theme.elevationLevel.max};
  background-color: ${({ theme }) => theme.grayscale[150]};
`;

export const PickerTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme: { titleSize } }) => titleSize.sm};
`;

export const EllipsisText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
`;
