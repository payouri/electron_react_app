import { BrowserWindow } from 'electron';
import { SecondaryWindowType } from './types';

const secondaryWindowsMap = new Map<SecondaryWindowType, BrowserWindow>();

export const getSecondaryWindow = (
  type: SecondaryWindowType
): BrowserWindow => {
  if (secondaryWindowsMap.has(type)) {
    return secondaryWindowsMap.get(type) as BrowserWindow;
  }

  const secondaryWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
    },
  });

  secondaryWindowsMap.set(type, secondaryWindow);

  secondaryWindow.on('closed', () => {
    secondaryWindowsMap.delete(type);
  });

  return secondaryWindow;
};
