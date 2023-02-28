import { MainWindowType } from '../types';

export const isMainWindowType = (
  windowType: unknown
): windowType is MainWindowType => {
  if (typeof windowType !== 'string') return false;

  return Object.values(MainWindowType).includes(windowType as MainWindowType);
};
