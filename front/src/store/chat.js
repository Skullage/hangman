const chat = {
  namespaced: true,
  state: () => ({
    messages: [],
    isChatShown: false,
  }),
  getters: {
    getUnreadMessagesCount(state) {
      return state.messages.filter((el) => !el.isRead).length;
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
        isRead: state.isChatShown,
      });
    },
    clearChat(state) {
      state.messages.length = 0;
    },
    toggleChat(state) {
      state.isChatShown = !state.isChatShown;
    },
  },
};

export default chat;
