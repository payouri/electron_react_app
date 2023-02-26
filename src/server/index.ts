import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { browserPathHandler } from './browser';
import { SERVER_PORT } from './constants';
import { proxyPathHandler } from './proxy';

const state: { server: Server | null } = {
  server: null,
};

const requestHandler = (req: IncomingMessage, res: ServerResponse) => {
  if (req.method?.toUpperCase() === 'GET' && req.url === '/health') {
    res.writeHead(200);
    res.end('Proxy server is up and running');
  } else if (req.method?.toUpperCase() === 'GET' && req.url === '/version') {
    res.writeHead(200);
    res.end('1.0.0');
  } else if (req.url?.startsWith('/proxy/')) {
    proxyPathHandler(req, res);
  } else if (req.url?.startsWith('/browser/')) {
    browserPathHandler(req, res);
  }
};

const startProxyServer = () =>
  new Promise<Server>((resolve) => {
    if (!state.server) {
      const server = createServer(requestHandler);
      server.listen(SERVER_PORT, () => {
        state.server = server;
        resolve(state.server);
      });
    } else resolve(state.server);
  });

const stopProxyServer = () =>
  new Promise<void>((resolve) => {
    if (!state.server) return;

    state.server.close(() => {
      resolve();
    });
    state.server = null;
  });

startProxyServer();

process.on('SIGKILL', stopProxyServer);
