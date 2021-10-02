export interface Contact {
  id: string;
  nickname: string;
  avatar: string;
}

export interface Message {
  content: MessageContent[];
  timestamp: number;
  from: string;
  to: string;
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
  target: string;
  message: Message;
}

export const DEFAULT_AVATAR = "https://www.gravatar.com/avatar";
export const DEFAULT_NICKNAME = "神秘人";