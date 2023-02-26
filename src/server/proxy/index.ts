import { load } from 'cheerio';
import { request as httpsRequest } from 'https';
import { URL } from 'url';
import { createBrotliDecompress, createGunzip } from 'zlib';
import { IncomingMessage, ServerResponse, request as httpRequest } from 'http';
import { SERVER_PORT } from '../constants';

export const proxyPathHandler = (req: IncomingMessage, res: ServerResponse) => {
  try {
    const parsedURL = new URL(
      req.url || '',
      `https://localhost:${SERVER_PORT}`
    );

    const realURL = parsedURL.pathname.replace('/proxy/', '');

    const { headers: requestHeaders } = req;

    // console.log(new URL(realURL));

    // console.log(requestHeaders.host);
    delete requestHeaders['content-length'];
    delete requestHeaders.connection;
    delete requestHeaders.host;
    // requestHeaders.host = new URL(realURL).host;
    // console.log(requestHeaders.host);

    requestHeaders['sec-ch-ua'] =
      '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"';
    requestHeaders['sec-ch-ua-mobile'] = '?0';
    requestHeaders['sec-ch-ua-platform'] = 'Windows';
    requestHeaders['sec-fetch-dest'] = 'document';
    requestHeaders['sec-fetch-mode'] = 'navigate';
    requestHeaders['sec-fetch-site'] = 'none';
    requestHeaders['sec-fetch-user'] = '?1';
    requestHeaders['upgrade-insecure-requests'] = '1';
    requestHeaders['user-agent'] =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36';

    if (req.method === 'OPTIONS') {
      console.log('OPTIONS');
      res.setHeader('access-control-allow-origin', '*');
      // res.setHeader(
      //   'access-control-allow-headers',
      //   'X-Custom-Header, Upgrade-Insecure-Requests, Cache-Control'
      // );
      // res.setHeader('allow', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
      res.writeHead(200);
      res.end();
      return;
    }

    const proxyRequest = (
      realURL.startsWith('https') ? httpsRequest : httpRequest
    )(
      realURL,
      {
        headers: requestHeaders,
        method: req.method,
      },
      async (proxyRes) => {
        const {
          statusCode,
          statusMessage,
          headers: responseHeaders,
        } = proxyRes;

        // console.log(responseHeaders['content-type']);
        if (responseHeaders['content-type']?.startsWith('text/html')) {
          const data = await new Promise<Buffer>((resolve) => {
            const chunks: Buffer[] = [];

            const stream =
              // eslint-disable-next-line no-nested-ternary
              responseHeaders['content-encoding'] === 'br'
                ? proxyRes.pipe(createBrotliDecompress())
                : responseHeaders['content-encoding'] === 'gzip'
                ? proxyRes.pipe(createGunzip())
                : proxyRes;

            stream.on('data', (chunk) => {
              // console.log(chunk);
              chunks.push(chunk);
            });

            stream.on('end', () => {
              resolve(Buffer.concat(chunks));
            });

            stream.on('error', (error) => {
              console.error(error);
              resolve(Buffer.from(''));
            });
          });

          delete responseHeaders['access-control-allow-origin'];
          responseHeaders['access-control-allow-origin'] = '*';

          delete responseHeaders.link;
          delete responseHeaders['content-encoding'];

          res.writeHead(statusCode || 500, statusMessage, responseHeaders);

          const htmlData = data.toString();

          // console.log(responseHeaders);

          const $ = load(htmlData);

          // const headNode = $('[src], [href]')
          //   .attr('src', (index, attribute) =>
          //     attribute
          //       ? (console.log('att', attribute),
          //         new URL(
          //           attribute,
          //           `http://localhost:${SERVER_PORT}/proxy`
          //         )).href
          //       : attribute
          //   )
          //   .attr('href', (index, attribute) =>
          //     attribute
          //       ? (console.log('att', attribute),
          //         new URL(
          //           attribute,
          //           `http://localhost:${SERVER_PORT}/proxy`
          //         ).href)
          //       : attribute
          //   );

          // console.log(headNode);

          res.write($.html());
        } else {
          delete responseHeaders['access-control-allow-origin'];
          responseHeaders['access-control-allow-origin'] = '*';

          console.log(responseHeaders);
          console.log(statusCode);
          res.writeHead(statusCode || 500, statusMessage, responseHeaders);

          proxyRes.pipe(res, {
            end: true,
          });
        }
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
};
