import { getItemCollection } from '../../../entities';
import {
  IPCMessagePayload,
  IPCMessageType,
  IPCResponsePayload,
} from '../../types';

export const ItemRoutes = {
  [IPCMessageType.GET_ITEMS]: async (
    payload: IPCMessagePayload[IPCMessageType.GET_ITEMS]
  ): Promise<IPCResponsePayload[IPCMessageType.GET_ITEMS]> => {
    const { start, count } = payload;

    const collection = await getItemCollection();

    const result = await collection.query({
      filter: {},
      skip: start,
      limit: count,
    });

    return result;
  },
  [IPCMessageType.GET_ITEM]: async (
    payload: IPCMessagePayload[IPCMessageType.GET_ITEM]
  ): Promise<IPCResponsePayload[IPCMessageType.GET_ITEM]> => {
    const { _id } = payload;

    const collection = await getItemCollection();

    const result = await collection.get(_id);

    return result;
  },
  [IPCMessageType.CREATE_ITEM]: async (
    payload: IPCMessagePayload[IPCMessageType.CREATE_ITEM]
  ): Promise<IPCResponsePayload[IPCMessageType.CREATE_ITEM]> => {
    const data = payload;

    const collection = await getItemCollection();
    const itemId = collection.generateId();
    const item = { ...data, _id: itemId };

    await collection.set(item._id, item);

    return item;
  },
  [IPCMessageType.UPDATE_ITEM]: async (
    payload: IPCMessagePayload[IPCMessageType.UPDATE_ITEM]
  ): Promise<IPCResponsePayload[IPCMessageType.UPDATE_ITEM]> => {
    const { _id, data } = payload;

    const collection = await getItemCollection();

    const item = await collection.get(_id);

    if (!item) {
      throw new Error(`Item with _id ${_id} not found`);
    }

    const updatedItem = { ...item, ...data };

    await collection.set(_id, updatedItem);

    return updatedItem;
  },
  [IPCMessageType.DELETE_ITEM]: async (
    payload: IPCMessagePayload[IPCMessageType.DELETE_ITEM]
  ): Promise<IPCResponsePayload[IPCMessageType.DELETE_ITEM]> => {
    const { _id } = payload;

    const collection = await getItemCollection();

    await collection.unset(_id);
  },
} as const;
