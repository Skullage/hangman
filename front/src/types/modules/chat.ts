export interface ChatState {
  messages: string[];
  isChatShown: boolean;
}

export interface ChatMessage {
  name: string;
  message: string;
  color: string;
  type: string;
  smileFolder?: string;
  time: string;
  isRead: boolean;
}
