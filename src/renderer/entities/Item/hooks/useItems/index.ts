import { Item } from 'main/entities/Item/Item.types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'redux-injectors';
import { MessageType, sendMessage } from 'renderer/services';
import { ITEM_PAGE_SIZE } from '../shared/constants';
import { selectItemsState } from '../shared/selectors';
import { actions, key, reducer } from '../shared/slice';
import { UseItemsReturnType } from './types';

export const useItems = (): UseItemsReturnType => {
  useInjectReducer({
    key,
    reducer,
  });

  const state = useSelector(selectItemsState);
  const dispatch = useDispatch();

  const createItem = async (param: Omit<Item, '_id'>) => {
    const response = await sendMessage({
      type: MessageType.CREATE_ITEM,
      payload: param,
    });

    dispatch(actions.pushItems([response]));

    return response;
  };

  const updateItem = async ({ _id, ...item }: Item) => {
    const response = await sendMessage({
      type: MessageType.UPDATE_ITEM,
      payload: {
        _id,
        data: item,
      },
    });

    dispatch(actions.updateItem(response));

    return response;
  };

  const loadMore = async () => {
    const { start, hasMore, loading } = state;

    if (!hasMore || loading) {
      return;
    }

    dispatch(actions.setItemState({ loading: true }));

    const response = await sendMessage({
      type: MessageType.GET_ITEMS,
      payload: {
        start,
        count: ITEM_PAGE_SIZE,
      },
    });

    dispatch(actions.pushItems(response));
    dispatch(
      actions.setItemState({
        start: start + ITEM_PAGE_SIZE,
        hasMore: response.length === ITEM_PAGE_SIZE,
        loading: false,
      })
    );
  };

  useEffect(() => {
    if (state.items.length === 0) {
      loadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ...state,
    loadMore,
    createItem,
    updateItem,
  };
};
