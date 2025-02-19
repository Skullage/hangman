import { createStore } from 'vuex';
import { RootState } from '@/types/store';
import theme from './theme';
import room from './room';
import notification from './notification';
import user from './user';
import hangman from './hangman';
import chat from './chat';
import modals from './modals';
import wordle from './wordle';

const store = createStore<RootState>({
  modules: {
    theme,
    room,
    notification,
    user,
    hangman,
    chat,
    modals,
    wordle,
  },
});

export default store;
