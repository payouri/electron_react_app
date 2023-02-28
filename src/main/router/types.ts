import { InjectedScripts } from '../injectApps/helpers/scripts/types';
import { AppConfig } from '../config/types';
import { Cart } from '../entities/Cart/Cart.types';
import { Item } from '../entities/Item/Item.types';
import { Tag } from '../entities/Tag/Tag.types';
import {
  CROSS_WINDOW_CHANNEL,
  IPC_ROUTER_CHANNEL,
  IPC_SCRIPTS_CHANNEL,
  IPC_SCRIPTS_RESPONSE_CHANNEL,
} from './constants';

export type IPCChannel =
  | typeof IPC_ROUTER_CHANNEL
  | typeof IPC_SCRIPTS_CHANNEL
  | typeof CROSS_WINDOW_CHANNEL
  | typeof IPC_SCRIPTS_RESPONSE_CHANNEL;

type ListQuery = {
  start: number;
  count: number;
};

export enum IPCMessageType {
  OPEN_BROWSER = 'OPEN_BROWSER',
  GET_CONFIG = 'GET_CONFIG',
  GET_CONFIG_PROPERTY = 'GET_CONFIG_PROPERTY',
  SAVE_CONFIG = 'SAVE_CONFIG',
  SET_CONFIG_PROPERTY = 'SET_CONFIG_PROPERTY',
  GET_ITEMS = 'GET_ITEMS',
  GET_ITEM = 'GET_ITEM',
  CREATE_ITEM = 'CREATE_ITEM',
  UPDATE_ITEM = 'UPDATE_ITEM',
  DELETE_ITEM = 'DELETE_ITEM',
  GET_TAGS = 'GET_TAGS',
  GET_TAG = 'GET_TAG',
  CREATE_TAG = 'CREATE_TAG',
  UPDATE_TAG = 'UPDATE_TAG',
  DELETE_TAG = 'DELETE_TAG',
  GET_CARTS = 'GET_CARTS',
  GET_CART = 'GET_CART',
  CREATE_CART = 'CREATE_CART',
  UPDATE_CART = 'UPDATE_CART',
  DELETE_CART = 'DELETE_CART',
  ADD_ITEMS_TO_CART = 'ADD_ITEMS_TO_CART',
}

export type IPCMessagePayload = {
  [IPCMessageType.GET_CONFIG]: void;
  [IPCMessageType.SAVE_CONFIG]: AppConfig;
  [IPCMessageType.GET_CONFIG_PROPERTY]: AppConfig[keyof AppConfig];
  [IPCMessageType.SET_CONFIG_PROPERTY]: {
    [T in keyof AppConfig]?: AppConfig[T];
  };
  [IPCMessageType.GET_ITEMS]: ListQuery;
  [IPCMessageType.GET_ITEM]: {
    _id: string;
  };
  [IPCMessageType.CREATE_ITEM]: Omit<Item, '_id'>;
  [IPCMessageType.UPDATE_ITEM]: {
    _id: string;
    data: Partial<Omit<Item, '_id'>>;
  };
  [IPCMessageType.DELETE_ITEM]: {
    _id: string;
  };
  [IPCMessageType.GET_TAGS]: ListQuery;
  [IPCMessageType.GET_TAG]: {
    _id: string;
  };
  [IPCMessageType.CREATE_TAG]: Omit<Tag, '_id'>;
  [IPCMessageType.UPDATE_TAG]: {
    _id: string;
    data: Partial<Omit<Tag, '_id'>>;
  };
  [IPCMessageType.DELETE_TAG]: {
    _id: string;
  };
  [IPCMessageType.GET_CARTS]: ListQuery;
  [IPCMessageType.GET_CART]: {
    _id: string;
  };
  [IPCMessageType.CREATE_CART]: Omit<Cart, '_id'>;
  [IPCMessageType.UPDATE_CART]: {
    _id: string;
    data: Partial<Omit<Cart, '_id'>>;
  };
  [IPCMessageType.DELETE_CART]: {
    _id: string;
  };
  [IPCMessageType.ADD_ITEMS_TO_CART]: {
    _id: string;
    items: Item[];
  };
  [IPCMessageType.OPEN_BROWSER]: {
    url: string;
    scriptsToRun?: InjectedScripts[];
    maximize?: boolean;
  };
};

export type IPCResponsePayload = {
  [IPCMessageType.GET_CONFIG]: AppConfig;
  [IPCMessageType.SAVE_CONFIG]: void;
  [IPCMessageType.GET_CONFIG_PROPERTY]: AppConfig[keyof AppConfig];
  [IPCMessageType.SET_CONFIG_PROPERTY]: void;
  [IPCMessageType.GET_ITEMS]: Item[];
  [IPCMessageType.GET_ITEM]: Item | null;
  [IPCMessageType.CREATE_ITEM]: Item;
  [IPCMessageType.UPDATE_ITEM]: Item;
  [IPCMessageType.DELETE_ITEM]: void;
  [IPCMessageType.GET_TAGS]: Tag[];
  [IPCMessageType.GET_TAG]: Tag | null;
  [IPCMessageType.CREATE_TAG]: Tag;
  [IPCMessageType.UPDATE_TAG]: Tag;
  [IPCMessageType.DELETE_TAG]: void;
  [IPCMessageType.GET_CARTS]: Cart[];
  [IPCMessageType.GET_CART]: Cart | null;
  [IPCMessageType.CREATE_CART]: Cart;
  [IPCMessageType.UPDATE_CART]: Cart;
  [IPCMessageType.DELETE_CART]: void;
  [IPCMessageType.ADD_ITEMS_TO_CART]: Cart;
  [IPCMessageType.OPEN_BROWSER]: void;
};

export type IncomingIPCMessage<Type extends IPCMessageType = IPCMessageType> = {
  type: Type;
  requestId: string;
  payload: IPCMessagePayload[Type];
};

export type OutgoingIPCMessage<Type extends IPCMessageType = IPCMessageType> = {
  type: Type;
  requestId: string;
  payload: IPCResponsePayload[Type];
};
