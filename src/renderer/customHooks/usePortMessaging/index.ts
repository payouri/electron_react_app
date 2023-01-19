import { useEffect } from 'react';

let ports: Set<MessagePort> | null = null;

window.onmessage = (event) => {
  // event.source === window means the message is coming from the preload
  // script, as opposed to from an <iframe> or other source.
  if (event.source === window && event.data === 'message-bridge') {
    ports = new Set(event.ports);
  }
};

export const usePortMessaging = () => {
  console.log('usePortMessaging');

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('usePortMessaging: ports', ports);
      if (!ports) return;

      if ([...ports].find((p) => p)) {
        ports.forEach((p) => p.postMessage('Hello from the renderer!'));
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);
};
