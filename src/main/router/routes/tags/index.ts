import { getTagCollection } from '../../../entities';
import {
  IPCMessagePayload,
  IPCMessageType,
  IPCResponsePayload,
} from '../../types';

export const TagRoutes = {
  [IPCMessageType.GET_TAGS]: async (
    payload: IPCMessagePayload[IPCMessageType.GET_TAGS]
  ): Promise<IPCResponsePayload[IPCMessageType.GET_TAGS]> => {
    const { start, count } = payload;

    const collection = await getTagCollection();

    const result = await collection.query({
      filter: {},
      skip: start,
      limit: count,
    });

    return result;
  },
  [IPCMessageType.GET_TAG]: async (
    payload: IPCMessagePayload[IPCMessageType.GET_TAG]
  ): Promise<IPCResponsePayload[IPCMessageType.GET_TAG]> => {
    const { _id } = payload;

    const collection = await getTagCollection();

    const result = await collection.get(_id);

    return result;
  },
  [IPCMessageType.CREATE_TAG]: async (
    payload: IPCMessagePayload[IPCMessageType.CREATE_TAG]
  ): Promise<IPCResponsePayload[IPCMessageType.CREATE_TAG]> => {
    const data = payload;

    const collection = await getTagCollection();
    const tagId = collection.generateId();
    const tag = { ...data, _id: tagId };

    await collection.set(tag._id, tag);

    return tag;
  },
  [IPCMessageType.UPDATE_TAG]: async (
    payload: IPCMessagePayload[IPCMessageType.UPDATE_TAG]
  ): Promise<IPCResponsePayload[IPCMessageType.UPDATE_TAG]> => {
    const { _id, data } = payload;

    const collection = await getTagCollection();

    const tag = await collection.get(_id);

    if (!tag) {
      throw new Error(`Tag with _id ${_id} not found`);
    }

    const updatedTag = { ...tag, ...data };

    await collection.set(_id, updatedTag);

    return updatedTag;
  },
  [IPCMessageType.DELETE_TAG]: async (
    payload: IPCMessagePayload[IPCMessageType.DELETE_TAG]
  ): Promise<IPCResponsePayload[IPCMessageType.DELETE_TAG]> => {
    const { _id } = payload;

    const collection = await getTagCollection();

    await collection.unset(_id);
  },
} as const;
