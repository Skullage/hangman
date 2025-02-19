import Module from 'vuex';
import { CharSlot } from '@/types/modules/hangman';

const hangman: Module<{}, any> = {
  namespaced: true,
  getters: {
    getWord(state, getters, rootState, rootGetters): string | null {
      const room = rootGetters['room/getRoom'];
      if (!room) return null;

      const { word, openedChars } = room.gameStatus;
      return word
        .split('')
        .map((char) => (openedChars.includes(char) ? char : ' '))
        .join('');
    },
    getCharSlots(state, getters, rootState, rootGetters): CharSlot[] | null {
      const room = rootGetters['room/getRoom'];
      if (!room) return null;

      const { alphabet, openedChars } = room.gameStatus;
      return alphabet.map((char: string) => ({
        char,
        disabled: openedChars.includes(char),
      }));
    },
    getLivesLast(state, getters, rootState, rootGetters): number | null {
      return rootGetters["room/getRoom"]?.gameStatus.leftLives || null;
    },
  },
};

export default hangman;