import { HTMLAttributes, useEffect, useState } from 'react';
import { IntrinsicElementsKeys } from 'styled-components';

const ElementHighlighter = ({ element }: { element: HTMLElement | null }) => {
  const [highlightedElement, setHighlightedElement] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    if (element) {
      setHighlightedElement(element);
    }
  }, [element]);

  useEffect(() => {
    let highlighter: HTMLElement | null = null;
    if (highlightedElement) {
      const { top, left, width, height } =
        highlightedElement.getBoundingClientRect();
      highlighter = document.createElement('div');
      highlighter.style.position = 'absolute';
      highlighter.style.top = `${top}px`;
      highlighter.style.left = `${left}px`;
      highlighter.style.width = `${width}px`;
      highlighter.style.height = `${height}px`;
      highlighter.style.border = '2px solid red';
      highlighter.style.pointerEvents = 'none';
      document.body.appendChild(highlighter);
    }
    return () => {
      if (highlighter) document.body.removeChild(highlighter);
    };
  }, [highlightedElement]);

  return null;
};

export const useElementPicker = ({
  rootNode,
  allowedElementsTypes,
  onElementPicked,
}: {
  rootNode: HTMLElement | null;
  allowedElementsTypes: (IntrinsicElementsKeys | '#text')[];
  onElementPicked: (element: HTMLElement) => void;
}) => {
  const [isPicking, setIsPicking] = useState<boolean>(false);
  const [highlightedElement, setHighlightedElement] =
    useState<HTMLElement | null>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsPicking(false);
    }
  };

  const handleMouseDown = (event: MouseEvent) => {
    if (isPicking && rootNode) {
      const element = event.target as HTMLElement;
      if (rootNode.contains(element)) {
        onElementPicked(element);
      }
      setIsPicking(false);
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isPicking) return;

    if (rootNode instanceof HTMLIFrameElement) {
      console.log(
        rootNode.contentWindow
          ? rootNode.contentWindow.document
          : rootNode.contentDocument
      );
    }
    console.log(event.composedPath());
  };

  useEffect(() => {
    if (isPicking) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPicking]);

  return {
    isPicking,
    setIsPicking,
  };
};
