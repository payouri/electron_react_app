import { Item } from 'main/entities/Item/Item.types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'redux-injectors';
import { MessageType, sendMessage } from 'renderer/services';
import { CART_PAGE_SIZE } from './constants';
import { selectCartsState } from './selectors';
import { actions, key, reducer } from './slice';
import { UseCartsReturnType } from './types';

export const useCarts = (): UseCartsReturnType => {
  useInjectReducer({
    key,
    reducer,
  });

  const state = useSelector(selectCartsState);
  const dispatch = useDispatch();

  const loadMore = async () => {
    const { start, hasMore, loading } = state;

    if (!hasMore || loading) {
      return;
    }

    dispatch(actions.setCartState({ loading: true }));

    const response = await sendMessage({
      type: MessageType.GET_CARTS,
      payload: {
        start,
        count: CART_PAGE_SIZE,
      },
    });

    dispatch(actions.pushCarts(response));
    dispatch(
      actions.setCartState({
        start: start + CART_PAGE_SIZE,
        hasMore: response.length === CART_PAGE_SIZE,
        loading: false,
      })
    );
  };

  const createCart = async (name: string) => {
    const response = await sendMessage({
      type: MessageType.CREATE_CART,
      payload: {
        name,
        items: [],
      },
    });

    dispatch(actions.pushCarts([response]));

    return response;
  };

  const updateCart = async (cartId: string, name: string) => {
    const response = await sendMessage({
      type: MessageType.UPDATE_CART,
      payload: {
        _id: cartId,
        data: {
          name,
        },
      },
    });

    return response;
  };

  const deleteCart = async (cartId: string) => {
    await sendMessage({
      type: MessageType.DELETE_CART,
      payload: {
        _id: cartId,
      },
    });
  };

  const getCartById = async (cartId: string) => {
    const response = await sendMessage({
      type: MessageType.GET_CART,
      payload: {
        _id: cartId,
      },
    });

    return response;
  };

  const addItems = async (cartId: string, items: Item[]) => {
    const response = await sendMessage({
      type: MessageType.ADD_ITEMS_TO_CART,
      payload: {
        _id: cartId,
        items,
      },
    });

    dispatch(actions.upsertCarts([response]));
  };

  useEffect(() => {
    if (state.carts.length === 0) {
      loadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ...state,
    loadMore,
    createCart,
    updateCart,
    deleteCart,
    getCart: getCartById,
    addItemsToCart: addItems,
  };
};
