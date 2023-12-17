const chat = {
  namespaced: true,
  state: () => ({
    messages: [],
    isChatShown: false,
    readMessages: [],
  }),
  getters: {
    getUnreadMessagesCount(state) {
      return state.messages.length - state.readMessages.length;
    },
  },
  mutations: {
    getMessage(state, data) {
      state.messages.push({
        name: data.name,
        msg: data.message,
        color: data.color,
        type: data.type,
        time: data.time,
      });
    },
    clearChat(state) {
      state.messages.length = 0;
    },
  },
};

export default chat;
