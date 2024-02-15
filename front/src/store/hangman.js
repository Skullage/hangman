const hangman = {
  namespaced: true,
  getters: {
    getWord(state, getters, rootState, rootGetters) {
      if (rootGetters["room/getRoom"]) {
        let buffer = "";
        rootGetters["room/getRoom"].gameStatus.word.split("").forEach((el) => {
          if (
            !rootGetters["room/getRoom"].gameStatus.openedChars.includes(el)
          ) {
            buffer += " ";
          } else {
            buffer += el;
          }
        });
        return buffer;
      } else {
        return null;
      }
    },
    getCharSlots(state, getters, rootState, rootGetters) {
      let buffer = [];
      if (rootGetters["room/getRoom"]) {
        rootGetters["room/getRoom"].gameStatus.alphabet.forEach((el) => {
          buffer.push({
            char: el,
            disabled:
              rootGetters["room/getRoom"].gameStatus.openedChars.includes(el),
          });
        });
        return buffer;
      } else {
        return null;
      }
    },
    getLivesLast(state, getters, rootState, rootGetters) {
      return rootGetters["room/getRoom"]
        ? rootGetters["room/getRoom"].gameStatus.leftLives
        : null;
    },
  },
};

export default hangman;
