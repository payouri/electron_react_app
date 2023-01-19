import { createRoot } from 'react-dom/client';
import { usePortMessaging } from './customHooks/usePortMessaging';

const App = () => {
  usePortMessaging();

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
