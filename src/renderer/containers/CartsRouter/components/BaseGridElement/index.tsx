/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
import { MouseEvent, useEffect, useState } from 'react';
import { Carousel, CarouselProps } from 'renderer/components/Carousel';
import styled from 'styled-components';

const OuterNode = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap[12]};
  box-shadow: ${({ theme }) => theme.boxShadow.elevation[1]};
  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.elevation[5]};
  }
  transition: box-shadow 0.2s ease-in-out;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => `0 ${theme.gap[8]}`};
  flex: 1;
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => `0 ${theme.gap[8]} ${theme.gap[12]}`};
  flex: 1;
`;

const OverlayWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
`;

export type BaseGridElementProps = {
  carouselProps?: CarouselProps;
  bottomSlot?: React.ReactNode;
  bodySlot?: React.ReactNode;
  overlaySlot?: React.ReactNode;
  overlayVisible?: boolean;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  onHover?: (hover: boolean, event: MouseEvent<HTMLDivElement>) => void;
};

export const BaseGridElement = ({
  carouselProps,
  bottomSlot,
  bodySlot,
  overlaySlot,
  overlayVisible,
  onClick = undefined,
  onHover = undefined,
}: BaseGridElementProps) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(
    overlayVisible ?? false
  );

  useEffect(() => {
    if (!overlaySlot) return;

    if (
      typeof overlayVisible === 'boolean' &&
      overlayVisible !== isOverlayVisible
    ) {
      setIsOverlayVisible(overlayVisible);
    }
  }, [overlaySlot, overlayVisible, isOverlayVisible]);

  return (
    <OuterNode
      onClick={onClick}
      onMouseEnter={(event) => {
        onHover?.(true, event);
        if (overlayVisible === undefined) {
          setIsOverlayVisible(true);
        }
      }}
      onMouseLeave={(event) => {
        onHover?.(false, event);
        if (overlayVisible === undefined) {
          setIsOverlayVisible(false);
        }
      }}
    >
      {carouselProps && (
        <Carousel width="100%" aspectRatio="16/10" {...carouselProps} />
      )}
      {bodySlot && <BodyWrapper>{bodySlot}</BodyWrapper>}
      {bottomSlot && <BottomWrapper>{bottomSlot}</BottomWrapper>}
      {isOverlayVisible && overlaySlot && (
        <OverlayWrapper>{overlaySlot}</OverlayWrapper>
      )}
    </OuterNode>
  );
};
