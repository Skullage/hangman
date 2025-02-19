import { ThemeState } from './modules/theme';
import { RoomState } from './modules/room';
import { NotificationState } from './modules/notification';
import { UserState } from './modules/user';
import { HangmanState } from './modules/hangman';
import { ChatState } from './modules/chat';
import { ModalsState } from './modules/modals';
import { WordleState } from './modules/wordle';

export interface RootState {
  theme: ThemeState;
  room: RoomState;
  notification: NotificationState;
  user: UserState;
  hangman: HangmanState;
  chat: ChatState;
  modals: ModalsState;
  wordle: WordleState;
}
