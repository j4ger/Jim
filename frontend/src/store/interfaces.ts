export interface Contact {
  id: number;
  nickname: string;
  avatar: string;
}

export interface Message {
  content: MessageContent[];
  timestamp: number;
  from: number;
  to: number;
}

export interface ConversationOptions {
  pinned: boolean;
  removed: boolean;
  unread: number;
}

export interface MessageContent {
  type: MessageType;
  content: string;
}

export enum MessageType {
  text = 0,
  image = 1,
}

export interface NewMessage {
  target: number;
  message: Message;
}

export const DEFAULT_AVATAR = "https://www.gravatar.com/avatar";
export const DEFAULT_NICKNAME = "神秘人";

export class WSMessage {
  type!: WSMessageType;
  message!: WSInnerMessage;

  constructor(type: WSMessageType, message: WSInnerMessage) {
    this.type = type;
    this.message = message;
  }
}

export interface WSInnerMessage {
  content: string;
  timestamp: number;
  from: number;
  to: number;
}

export enum WSMessageType {
  SEND_MESSAGE = 0,
  RECEIVE_MESSAGE = 1,
}
