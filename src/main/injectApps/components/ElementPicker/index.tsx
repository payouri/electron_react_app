import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { css, ThemeProvider } from 'styled-components';
import { theme } from '../../../../renderer/styles/theme';
import { ELEMENT_OFFSET_PX } from './constants';
import { ElementPickerContainer, EllipsisText, PickerTitle } from './styles';
import {
  ElementPickerProps,
  ElementResultByType,
  ImageElementResult,
  isImage,
  isLink,
  isNumber,
  isText,
  LinkElementResult,
  NumberElementResult,
  processImage,
  processLink,
  processNumber,
  processText,
  TextElementResult,
} from './types';

const PickerHeadline = ({
  elementType,
}: {
  elementType: ElementPickerProps['elementType'];
}) => {
  if (elementType === 'link') {
    return <PickerTitle>Click on a link to select it</PickerTitle>;
  }
  if (elementType === 'image') {
    return <PickerTitle>Click on an image to select it</PickerTitle>;
  }
  if (elementType === 'number') {
    return <PickerTitle>Click on a number to select it</PickerTitle>;
  }
  if (elementType === 'text') {
    return <PickerTitle>Click on a text to select it</PickerTitle>;
  }

  return null;
};

const getLinkContent = (matchingElement: LinkElementResult | null) => {
  if (!matchingElement) {
    return null;
  }
  return (
    <div>
      <EllipsisText>Link: {matchingElement.href}</EllipsisText>
      <EllipsisText>Text: {matchingElement.text}</EllipsisText>
    </div>
  );
};

const getImageContent = (matchingElement: ImageElementResult | null) => {
  if (!matchingElement) {
    return null;
  }
  return (
    <div>
      <EllipsisText>Image: {matchingElement.src}</EllipsisText>
      <EllipsisText>Alt: {matchingElement.alt}</EllipsisText>
    </div>
  );
};

const getNumberContent = (matchingElement: NumberElementResult | null) => {
  if (!matchingElement) {
    return null;
  }
  return (
    <div>
      <EllipsisText>Number: {matchingElement.number}</EllipsisText>
    </div>
  );
};

const getTextContent = (matchingElement: TextElementResult | null) => {
  if (!matchingElement) {
    return null;
  }
  return (
    <div>
      <EllipsisText>Text: {matchingElement.text}</EllipsisText>
    </div>
  );
};

const PickerBody = ({
  elementType,
  matchingElement,
}: {
  elementType: ElementPickerProps['elementType'];
  matchingElement:
    | ElementResultByType[ElementPickerProps['elementType']]
    | null;
}) => {
  if (elementType === 'link') {
    return getLinkContent(matchingElement as LinkElementResult | null);
  }
  if (elementType === 'image') {
    return getImageContent(matchingElement as ImageElementResult | null);
  }
  if (elementType === 'number') {
    return getNumberContent(matchingElement as NumberElementResult | null);
  }
  if (elementType === 'text') {
    return getTextContent(matchingElement as TextElementResult | null);
  }

  return null;
};

const getNewPosition = ({
  x,
  y,
  containerHeight,
  containerWidth,
}: {
  x: number;
  y: number;
  containerWidth: number;
  containerHeight: number;
}) => {
  const { width } = document.body.getBoundingClientRect();
  const {
    document: { body },
  } = window;
  const height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    body.clientHeight
  );

  const newX =
    x + containerWidth + ELEMENT_OFFSET_PX > width
      ? x - containerWidth
      : x + ELEMENT_OFFSET_PX;
  const newY =
    y + containerHeight + ELEMENT_OFFSET_PX > height
      ? y - containerHeight
      : y + ELEMENT_OFFSET_PX;

  return { x: newX, y: newY };
};

function handleComposedPath(
  composedPath: EventTarget[],
  elementType: ElementPickerProps['elementType']
): ElementResultByType[ElementPickerProps['elementType']] | null {
  if (elementType === 'link') {
    const link = composedPath.find(isLink);

    if (link) {
      return processLink(link);
    }
  }
  if (elementType === 'image') {
    const image = composedPath.find(isImage);

    if (image) {
      return processImage(image);
    }
  }
  if (elementType === 'number') {
    const number = composedPath.find(isNumber);

    if (number) {
      return processNumber(number);
    }
  }
  if (elementType === 'text') {
    const lastElement = composedPath.shift();
    const text = isText(lastElement);

    if (text) {
      return processText(lastElement);
    }
  }

  return null;
}

export const ElementPicker = ({ elementType }: ElementPickerProps) => {
  const [mousePosition, setMousePosition] = useState<null | {
    x: number;
    y: number;
  }>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [matchingElement, setMatchingElement] = useState<
    ElementResultByType[ElementPickerProps['elementType']] | null
  >(null);

  useEffect(() => {
    const handleMouseLeave = () => {
      if (matchingElement) {
        setMatchingElement(null);
      }
    };
    const handleMouseEnter = (e: MouseEvent) => {
      if (mousePosition === null) {
        const { width: containerWidth = 0, height: containerHeight = 0 } =
          containerRef.current?.getBoundingClientRect() || {};

        setMousePosition(
          getNewPosition({
            x: e.clientX,
            y: e.clientY,
            containerHeight,
            containerWidth,
          })
        );
      }
    };
    const handleMouseMove = (e: MouseEvent) => {
      const { width: containerWidth = 0, height: containerHeight = 0 } =
        containerRef.current?.getBoundingClientRect() || {};
      setMousePosition(
        getNewPosition({
          x: e.clientX,
          y: e.clientY,
          containerHeight,
          containerWidth,
        })
      );

      const newMatchingElement = handleComposedPath(
        e.composedPath(),
        elementType
      );

      if (newMatchingElement) {
        setMatchingElement(newMatchingElement);
        newMatchingElement.node.style.outline = '2px solid  red';
        newMatchingElement.node.style.cursor = 'pointer';
      } else if (!newMatchingElement && matchingElement) {
        matchingElement.node.style.removeProperty('outline');
        matchingElement.node.style.removeProperty('cursor');
        setMatchingElement(null);
      }
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setMousePosition(null);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchingElement?.node]);

  useLayoutEffect(() => {
    const node = matchingElement?.node || null;
    const onElementClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    if (node) {
      node.addEventListener('click', onElementClick);
    }
    return () => {
      if (node) {
        node.removeEventListener('click', onElementClick);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchingElement?.node]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <ElementPickerContainer
          left={mousePosition?.x}
          top={mousePosition?.y}
          ref={containerRef}
        >
          <PickerHeadline elementType={elementType} />
          <PickerBody
            elementType={elementType}
            matchingElement={matchingElement}
          />
        </ElementPickerContainer>
      </ThemeProvider>
    </>
  );
};
