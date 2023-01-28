import { createRoot } from 'react-dom/client';
import { useCrossWindowMessage } from './customHooks/useCrossWindowMessage';
import { WindowType } from './customHooks/useCrossWindowMessage/types';

const App = () => {
  useCrossWindowMessage({
    windowType: WindowType.SECONDARY,
  });

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

const container = document.getElementById('secondaryRoot');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
