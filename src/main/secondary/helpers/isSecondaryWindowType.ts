import { SecondaryWindowType } from '../types';

export const isSecondaryWindowType = (
  windowType: unknown
): windowType is SecondaryWindowType => {
  if (typeof windowType !== 'string') return false;

  return Object.values(SecondaryWindowType).includes(
    windowType as SecondaryWindowType
  );
};
