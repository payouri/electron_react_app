import { CrossWindowRequestType } from '../constants';

export const isKnownRequestType = (
  requestType: string
): requestType is CrossWindowRequestType => {
  return Object.values(CrossWindowRequestType).includes(
    requestType as CrossWindowRequestType
  );
};
