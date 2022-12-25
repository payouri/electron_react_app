import {
  IPCMessagePayload,
  IPCMessageType,
  IPCResponsePayload,
} from '../types';
import { CartRoutes } from './carts';
import { ConfigRoutes } from './config';
import { ItemRoutes } from './items';
import { TagRoutes } from './tags';

export const Routes = {
  ...CartRoutes,
  ...ConfigRoutes,
  ...ItemRoutes,
  ...TagRoutes,
} as Record<
  IPCMessageType,
  (
    payload: IPCMessagePayload[IPCMessageType]
  ) => Promise<IPCResponsePayload[IPCMessageType]>
>;
