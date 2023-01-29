import {
  createServer,
  IncomingMessage,
  request as httpRequest,
  Server,
  ServerResponse,
} from 'http';
import { request as httpsRequest } from 'https';
import { URL } from 'url';
import { PROXY_SERVER_PORT } from './constants';

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
    try {
      const parsedURL = new URL(
        req.url || '',
        `http://localhost:${PROXY_SERVER_PORT}`
      );

      const realURL = parsedURL.pathname.replace('/proxy/', '');

      const { headers: requestHeaders } = req;

      delete requestHeaders['content-length'];
      delete requestHeaders.connection;
      delete requestHeaders.host;

      const proxyRequest = (
        realURL.startsWith('https') ? httpsRequest : httpRequest
      )(
        realURL,
        {
          headers: requestHeaders,
          method: req.method,
        },
        (proxyRes) => {
          const {
            statusCode,
            statusMessage,
            headers: responseHeaders,
          } = proxyRes;

          res.writeHead(statusCode || 500, statusMessage, responseHeaders);

          proxyRes.pipe(res, {
            end: true,
          });
        }
      );

      req.pipe(proxyRequest, {
        end: true,
      });
    } catch (error) {
      console.error(error);

      res.writeHead(500, "Couldn't parse URL");
      res.end();
    }
  }
};

const startProxyServer = () =>
  new Promise<Server>((resolve) => {
    if (!state.server) {
      const server = createServer(requestHandler);
      server.listen(PROXY_SERVER_PORT, () => {
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
