import { Browser, executablePath } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

let browser: Browser | null = null;

let loadingBrowser: Promise<Browser> | false = false;

puppeteer.use(StealthPlugin());

export const createHeadlessBrowser = async () => {
  if (browser) return browser;
  if (loadingBrowser) return loadingBrowser;

  loadingBrowser = puppeteer.launch({
    headless: false,
    executablePath: executablePath(),
  });

  browser = await loadingBrowser;
  browser.once('disconnected', () => {
    browser = null;
  });

  loadingBrowser = false;

  return browser;
};

export const getBrowserPage = async () => {
  const currentBrowser = await createHeadlessBrowser();

  return currentBrowser.newPage();
};
