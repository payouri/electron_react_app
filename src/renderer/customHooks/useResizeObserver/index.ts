import { useEffect, useMemo, useState } from 'react';

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

  const observer = useMemo(
    () =>
      new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          setDimensions(entry.contentRect);
        });
      }),
    []
  );

  useEffect(() => {
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [element, observer]);

  return { dimensions, setElement };
};
