import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { LoadableIframe } from './components/LoadableIframe';
import { PageContainer } from './containers/MainContainer/styles';
import { useCrossWindowMessage } from './customHooks/useCrossWindowMessage';
import { WindowType } from './customHooks/useCrossWindowMessage/types';
import { useElementPicker } from './customHooks/useElementPicker';
import { GlobalStyle } from './styles/global.styles';
import { theme } from './styles/theme';

const App = () => {
  useCrossWindowMessage({
    windowType: WindowType.SECONDARY,
  });
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const { setIsPicking } = useElementPicker({
    rootNode: iframeRef.current,
    allowedElementsTypes: [],
    onElementPicked: console.log,
  });

  useEffect(() => {
    if (iframeRef.current) {
      setIsPicking(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iframeRef.current, setIsPicking]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PageContainer direction="column">
        <h1>Hello World</h1>
        <LoadableIframe
          ref={iframeRef}
          flex="1 1 auto"
          uri="https://www.google.com"
          height="100%"
          width="100%"
        />
      </PageContainer>
    </ThemeProvider>
  );
};

const container = document.getElementById('secondaryRoot');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
