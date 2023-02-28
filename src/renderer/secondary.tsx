import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
// import { LoadableIframe } from './components/LoadableIframe';
import { PageContainer } from './containers/MainContainer/styles';
import { useCrossWindowMessage } from './customHooks/useCrossWindowMessage';
import { SecondaryWindowType } from 'main/lib/MessageBridge/types';
import { useElementPicker } from './customHooks/useElementPicker';
import { GlobalStyle } from './styles/global.styles';
import { theme } from './styles/theme';
import axios from 'axios';

const App = () => {
  useCrossWindowMessage({
    windowType: SecondaryWindowType.DEFAULT,
  });
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [page, setPage] = useState<string | null>();

  async function getPage() {
    const newPage = await axios(
      'http://localhost:9999/proxy/https://www.google.com',
      {
        maxRedirects: 2,
        headers: {
          // 'Cache-Control': 'no-cache',
        },
      }
    );

    try {
      // const newPageBody = await newPage.text();
      // console.log({ newPageBody });
      setPage(newPage.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPage();
  }, []);

  console.log({
    page,
  });

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
        {/* <LoadableIframe
          ref={iframeRef}
          flex="1 1 auto"
          uri="http://localhost:9999/proxy/https://www.google.com"
          height="100%"
          width="100%"
        />

        i */}
        {page && <div dangerouslySetInnerHTML={{ __html: page }} />}
      </PageContainer>
    </ThemeProvider>
  );
};

const container = document.getElementById('secondaryRoot');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
