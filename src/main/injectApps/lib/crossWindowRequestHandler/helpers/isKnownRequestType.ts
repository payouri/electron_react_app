import { InjectedAppsCrossWindowRequestType } from '../constants';

export const isKnownRequestType = (
  requestType: string
): requestType is InjectedAppsCrossWindowRequestType => {
  return Object.values(InjectedAppsCrossWindowRequestType).includes(
    requestType as InjectedAppsCrossWindowRequestType
  );
};
