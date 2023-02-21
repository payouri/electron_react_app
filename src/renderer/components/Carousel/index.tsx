/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import styled, { CSSProperties } from 'styled-components';
import { ErrorBoundary } from '../ErrorBoundary';
import { ImagePreview } from '../ImagePreview';

export type CarouselProps = {
  images: { src: string; alt: string }[];
  height?: CSSProperties['height'];
  width?: CSSProperties['width'];
  aspectRatio?: CSSProperties['aspectRatio'];
  background?: CSSProperties['background'];
};

const CarouselOuter = styled.div.attrs<Omit<CarouselProps, 'images'>>(
  ({ aspectRatio, background, height, width, ...props }) => ({
    ...props,
    style: {
      ...props.style,
      aspectRatio,
      width,
      height,
      background,
    },
  })
)<Omit<CarouselProps, 'images'>>`
  position: relative;
  max-width: 100%;
  max-height: 100%;
`;

export const Carousel = ({ images, ...props }: CarouselProps) => {
  return (
    <CarouselOuter {...props}>
      {images.map((image) => (
        <ErrorBoundary key={image.src}>
          <ImagePreview key={image.src} src={image.src} alt={image.alt} />
        </ErrorBoundary>
      ))}
    </CarouselOuter>
  );
};
