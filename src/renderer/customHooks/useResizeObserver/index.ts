import { useCallback, useEffect, useState } from 'react';

export const useResizeObserver = (
  {
    initialElement,
  }: {
    initialElement: Element | null;
  } = {
    initialElement: null,
  }
) => {
  const [dimensions, setDimensions] = useState<DOMRectReadOnly | null>(null);
  const [element, setElement] = useState<Element | null>(initialElement);

  const observer = useCallback(
    () =>
      new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          setDimensions(entry.contentRect);
        });
      }),
    []
  );

  useEffect(() => {
    const resizeObserver = observer();

    if (element) {
      resizeObserver.observe(element);
    }

    return () => {
      if (element) {
        resizeObserver.unobserve(element);
      }
    };
  }, [element, observer]);

  return { dimensions, setElement };
};
