import { writeFile } from 'fs/promises';
import { IncomingMessage, request as httpRequest, ServerResponse } from 'http';
import { request as httpsRequest } from 'https';
import { join } from 'path';
import { Page } from 'puppeteer';
import { getBrowserPage } from '../libs/HeadlessBrowser';
import { getPageHeadFilesUrls } from './helpers/getPageHeadFilesUrls';

const makeHttpRequest = async (origin: URL, page: Page, url: string) => {
  const isHttps = url.startsWith('https');

  const request = isHttps ? httpsRequest : httpRequest;
  const pageCookies = await page.cookies();

  return new Promise<string>((resolve, reject) => {
    request(
      {
        method: 'GET',
        href: url,
        headers: {
          Accept: '*/*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8,de;q=0.7',
          Connection: 'keep-alive',
          // 'Content-Length': '127',
          // 'Content-Type': 'application/x-www-form-urlencoded',
          Host: origin.host,
          // Origin: 'https://www.mywebsite.com',
          Referer: origin.href,
          Origin: origin.origin,
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-site',
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
          Cookie: pageCookies
            .map((cookie) => `${cookie.name}=${cookie.value}`)
            .join('; '),
        },
      },
      (res) => {
        let data = '';

        res
          .on('data', (chunk) => {
            data += chunk;
          })
          .on('end', () => {
            resolve(data);
          })
          .on('error', (err) => {
            reject(err);
          });
      }
    )
      .on('error', (err) => {
        reject(err);
      })
      .end();
  });
};

const isRelativeUrl = (url: string) => {
  return url.startsWith('/');
};

export const browserPathHandler = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  if (req.method !== 'GET') {
    res.writeHead(405);
    res.end();
    return;
  }

  const parsedRequestUrl = new URL(req.url || '', 'http://localhost:9999');
  const pageToOpen = parsedRequestUrl.pathname.replace('/browser/', '');
  const pageToOpenUrl = new URL(pageToOpen);
  const pageRequests = new Map<
    string,
    {
      url: string;
      data: string;
      method: string;
      headers: Record<string, string>;
    }
  >();

  const page = await getBrowserPage();
  await page.setRequestInterception(true);

  page.once('domcontentloaded', () => {
    console.log('DOM is ready');
  });
  page.once('load', () => {
    console.log('Page is loaded');
  });

  page.on('request', (interceptedRequest) => {
    if (interceptedRequest.isInterceptResolutionHandled()) return;

    interceptedRequest.headers();
    interceptedRequest.url();

    pageRequests.set(interceptedRequest.url(), {
      url: interceptedRequest.url(),
      data: interceptedRequest.postData() || '',
      method: interceptedRequest.method(),
      headers: interceptedRequest.headers(),
    });

    interceptedRequest.continue();
  });

  await page.goto(pageToOpen, {
    waitUntil: 'networkidle2',
  });

  try {
    const pageSources = await getPageHeadFilesUrls(page);

    const filesToDownload = pageSources.reduce<string[]>((acc, file) => {
      if (!file) {
        return acc;
      }

      return [
        ...acc,
        isRelativeUrl(file.source)
          ? new URL(file.source, pageToOpen).href
          : file.source,
      ];
    }, []);

    console.log({ pageRequests });
    await Promise.all(
      filesToDownload.map(async (url) => {
        try {
          const response = await makeHttpRequest(pageToOpenUrl, page, url);

          await writeFile(
            join(__dirname, 'files', url.split('/').pop() || ''),
            response
          );
        } catch (e) {
          console.log(url);
          console.log(e);
        }
      })
    );
  } catch (e) {
    console.log(e);
  }

  res.writeHead(200);
  res.end();
};
