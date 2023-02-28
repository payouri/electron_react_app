import {
  SecondaryWindowType,
  MainWindowType,
  MessageType,
  SenderMessage,
} from '../../../lib/MessageBridge/types';

export { SecondaryWindowType, MainWindowType, MessageType };

export type { SenderMessage };

export type WindowType = SecondaryWindowType | MainWindowType;
