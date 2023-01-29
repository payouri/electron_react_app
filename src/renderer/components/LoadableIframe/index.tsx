import { forwardRef, useLayoutEffect, useRef } from 'react';
import { useResizeObserver } from 'renderer/customHooks/useResizeObserver';
import { CSSProperties } from 'styled-components';
import { Iframe, IframeContainer } from './styles';

export const LoadableIframe = forwardRef<
  HTMLIFrameElement,
  {
    uri: string;
    height: number | string;
    width: number | string;
    // eslint-disable-next-line react/require-default-props
    flex?: CSSProperties['flex'];
  }
>(({ uri, height = '100%', width = '100%', flex }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setElement, dimensions } = useResizeObserver();

  useLayoutEffect(() => {
    if (containerRef.current) {
      setElement(containerRef.current);
    }
  }, [setElement]);

  return (
    <IframeContainer
      flex={flex}
      height={height}
      width={width}
      ref={containerRef}
    >
      <Iframe
        ref={ref}
        src={uri}
        height={`${dimensions?.height || 0}px`}
        width={`${dimensions?.width || 0}px`}
      />
    </IframeContainer>
  );
});
