import Module from 'vuex';
import { WordleState } from '@/types/modules/wordle';

const wordle: Module<WordleState, any> = {
  namespaced: true,
  state: (): WordleState => ({
    tryCount: 6,
    wordLength: 5,
    greenBtns: [],
    yellowBtns: [],
    inactiveBtns: [],
  }),
  getters: {
    getWord(state, getters, rootState, rootGetters): string {
      return rootGetters['room/getRoom']?.gameStatus.word || '';
    },
    getCharSlots(state, getters, rootState, rootGetters): string[] | null {
      const room = rootGetters['room/getRoom'];
      if (!room) return null;
      const { alphabet } = room.gameStatus;
      return alphabet.map((char: string) => ({
        char,
      }));
    },
    getLivesLast(state, getters, rootState, rootGetters): number | null {
      return rootGetters['room/getRoom']?.gameStatus.leftLives || null;
    },
  },
};

export default wordle;
