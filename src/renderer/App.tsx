import { Provider as StoreProvider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { PreloadContainer } from './containers/PreloadContainer';
import { store } from './store';
import { GlobalStyle } from './styles/global.styles';
import { theme } from './styles/theme';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <StoreProvider store={store}>
        <GlobalStyle />
        <Router>
          <PreloadContainer />
        </Router>
      </StoreProvider>
    </ThemeProvider>
  );
}
