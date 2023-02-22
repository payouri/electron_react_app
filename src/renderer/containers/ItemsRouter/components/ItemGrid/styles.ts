import styled from 'styled-components';

export const ItemGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-gap: ${({ theme: { gap } }) => gap['16']};
  padding: ${({ theme: { gap } }) => gap['16']};
  margin: 0 auto;
  width: 100%;
  overflow-y: auto;
`;

export const AddToCartWrapper = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  gap: ${({ theme: { gap } }) => gap[12]};
  padding: ${({ theme: { gap } }) => `${gap[8]} ${gap[12]}`};
  background-color: ${({ theme: { grayscale } }) => grayscale[0]};
`;
