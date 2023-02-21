import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../src/renderer/styles/global.styles';
import { theme } from '../src/renderer/styles/theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story: JSX.Element) => (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 2rem)',
          gap: '1rem',
        }}
      >
        <GlobalStyle />
        <Story />
      </div>
    </ThemeProvider>
  ),
];
