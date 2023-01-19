window.onmessage = (event) => {
  // event.source === window means the message is coming from the preload
  // script, as opposed to from an <iframe> or other source.
  if (event.source === window && event.data === 'message-bridge') {
    const [port] = event.ports;
    // Once we have the port, we can communicate directly with the main
    // process.
    port.onmessage = (e) => {
      console.log('from main process:', e.data);
      port.postMessage(event.data * 2);
    };
  }
};

export const usePortMessaging = () => {
  console.log('usePortMessaging');
};
