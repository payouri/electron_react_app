import { getCartCollection } from '../../../entities';
import {
  IPCMessagePayload,
  IPCMessageType,
  IPCResponsePayload,
} from '../../types';

export const CartRoutes = {
  [IPCMessageType.GET_CARTS]: async (
    payload: IPCMessagePayload[IPCMessageType.GET_CARTS]
  ): Promise<IPCResponsePayload[IPCMessageType.GET_CARTS]> => {
    const { start, count } = payload;

    const collection = await getCartCollection();

    const result = await collection.query({
      filter: {},
      skip: start,
      limit: count,
    });

    return result;
  },
  [IPCMessageType.GET_CART]: async (
    payload: IPCMessagePayload[IPCMessageType.GET_CART]
  ): Promise<IPCResponsePayload[IPCMessageType.GET_CART]> => {
    const { _id } = payload;

    const collection = await getCartCollection();

    const result = await collection.get(_id);

    return result;
  },
  [IPCMessageType.CREATE_CART]: async (
    payload: IPCMessagePayload[IPCMessageType.CREATE_CART]
  ): Promise<IPCResponsePayload[IPCMessageType.CREATE_CART]> => {
    const data = payload;

    const collection = await getCartCollection();
    const cartId = collection.generateId();
    const cart = { ...data, _id: cartId };

    await collection.set(cart._id, cart);

    return cart;
  },
  [IPCMessageType.UPDATE_CART]: async (
    payload: IPCMessagePayload[IPCMessageType.UPDATE_CART]
  ): Promise<IPCResponsePayload[IPCMessageType.UPDATE_CART]> => {
    const { _id, data } = payload;

    const collection = await getCartCollection();

    const cart = await collection.get(_id);

    if (!cart) {
      throw new Error(`Cart with _id ${_id} not found`);
    }

    const updatedCart = { ...cart, ...data };

    await collection.set(_id, updatedCart);

    return updatedCart;
  },
  [IPCMessageType.DELETE_CART]: async (
    payload: IPCMessagePayload[IPCMessageType.DELETE_CART]
  ): Promise<IPCResponsePayload[IPCMessageType.DELETE_CART]> => {
    const { _id } = payload;

    const collection = await getCartCollection();

    await collection.unset(_id);
  },
} as const;
