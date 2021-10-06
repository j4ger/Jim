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
