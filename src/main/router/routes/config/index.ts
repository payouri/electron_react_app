import { getConfig, saveConfig } from '../../../config';
import {
  IPCMessagePayload,
  IPCMessageType,
  IPCResponsePayload,
} from '../../types';

export const ConfigRoutes = {
  [IPCMessageType.GET_CONFIG]: async (): Promise<
    IPCResponsePayload[IPCMessageType.GET_CONFIG]
  > => {
    return getConfig();
  },
  [IPCMessageType.SAVE_CONFIG]: async (
    payload: IPCMessagePayload[IPCMessageType.SAVE_CONFIG]
  ): Promise<void> => {
    await saveConfig(payload);
  },
} as const;
