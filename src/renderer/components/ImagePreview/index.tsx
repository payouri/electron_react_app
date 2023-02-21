/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import styled, { CSSProperties } from 'styled-components';

const cache = new Map<string, HTMLImageElement>();

const ImageLoader = (() => {
  const load = (src: string) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      if (cache.has(src)) {
        resolve(cache.get(src)!);
        return;
      }

      const image = new Image();
      image.src = src;
      image.onload = () => {
        cache.set(src, image);
        resolve(image);
      };
      image.onerror = reject;
    });
  };

  return {
    load,
  };
})();

export type ImagePreviewProps = {
  src: string;
  alt: string;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  aspectRatio?: CSSProperties['aspectRatio'];
  imagesFit?: CSSProperties['objectFit'];
};

const ImageWrapper = styled.div.attrs<
  Pick<ImagePreviewProps, 'aspectRatio' | 'height' | 'width'>
>(({ aspectRatio, height, width, ...props }) => ({
  ...props,
  style: {
    ...props.style,
    aspectRatio,
    width,
    height,
  },
}))<Pick<ImagePreviewProps, 'imagesFit'>>`
  position: relative;
  max-width: 100%;
  max-height: 100%;

  picture,
  img {
    display: block;
    height: 100%;
    width: 100%;
    object-fit: ${({ imagesFit }) => imagesFit || 'cover'};
    pointer-events: none;
  }
`;

const defaultProps: Required<Omit<ImagePreviewProps, 'src' | 'alt'>> = {
  width: '100%',
  height: '100%',
  aspectRatio: 'unset',
  imagesFit: 'cover',
};

export const ImagePreview = ({
  src,
  alt,
  ...attributes
}: ImagePreviewProps) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const props = { ...defaultProps, ...attributes };

  const loadingImage = async () => {
    if (!loading) {
      setLoading(true);
    }
    try {
      const loadedImage = await ImageLoader.load(src);

      setImage(loadedImage);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadingImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return (
    <ImageWrapper {...props}>
      <picture>{image && <img src={image.src} alt={alt} />}</picture>
    </ImageWrapper>
  );
};
