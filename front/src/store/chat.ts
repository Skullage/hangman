import Module from 'vuex';
import { ChatState } from '@/types/modules/chat';

const chat: Module<ChatState, any> = {
  namespaced: true,
  state: (): ChatState => ({
    messages: [],
    isChatShown: false,
  }),
  getters: {
    getUnreadMessagesCount(state): number {
      return state.messages.filter((message) => !message.isRead).length;
    },
    getIsChatShown(state): boolean {
      return state.isChatShown;
    },
  },
  mutations: {
    getMessage(state, data: ChatMessage) {
      state.messages.push({
        name: data.name,
        message: data.message,
        color: data.color,
        type: data.type,
        smileFolder: data.smileFolder,
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
