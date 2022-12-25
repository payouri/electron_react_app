import { Item } from 'main/entities/Item/Item.types';
import { useDispatch } from 'react-redux';
import { useInjectReducer } from 'redux-injectors';
import { MessageType, sendMessage } from 'renderer/services';
import { key, reducer, actions } from '../shared/slice';

export const useItemsManager = () => {
  useInjectReducer({
    key,
    reducer,
  });

  const dispatch = useDispatch();

  const deleteItem = async (itemId: string) => {
    await sendMessage({
      type: MessageType.DELETE_ITEM,
      payload: {
        _id: itemId,
      },
    });

    dispatch(actions.removeItem(itemId));
  };

  const createItem = async (item: Omit<Item, '_id'>) => {
    const createdItem = await sendMessage({
      type: MessageType.CREATE_ITEM,
      payload: item,
    });

    dispatch(actions.addItem(createdItem));

    return createdItem;
  };

  const updateItem = async (itemId: string, update: Omit<Item, '_id'>) => {
    const updatedItem = await sendMessage({
      type: MessageType.UPDATE_ITEM,
      payload: {
        _id: itemId,
        data: update,
      },
    });

    dispatch(actions.updateItem(updatedItem));

    return updatedItem;
  };

  const getItem = async (itemId: string) => {
    const item = await sendMessage({
      type: MessageType.GET_ITEM,
      payload: {
        _id: itemId,
      },
    });

    return item;
  };

  return {
    createItem,
    deleteItem,
    getItem,
    updateItem,
  };
};
