import { Page } from 'puppeteer';

export const getPageHeadFilesUrls = async (page: Page) =>
  page.$$eval('head [src], head [href]', (els) => {
    return Promise.all(
      els.map(async (el) => {
        const source = el.getAttribute('src') || el.getAttribute('href');

        if (!source) return null;

        return {
          source,
        };
      })
    );
  });
