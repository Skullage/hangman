import SocketioService from "../api/socketio.service.js";
import Module from 'vuex';
import { UserState } from '@/types/modules/user';

const user: Module<UserState, any> = {
  namespaced: true,
  state: (): UserState => ({
    username: localStorage.getItem("username") ?? null,
  }),
  getters: {
    isLogined(state): boolean {
      return state.username !== null;
    },
  },
  mutations: {
    auth(state, name: string) {
      state.username = name;
      localStorage.setItem("username", name);
      SocketioService.setupSocketConnection();
    },
    changeNickname(state, name: string) {
      state.username = name;
      localStorage.setItem("username", name);
      SocketioService.changeName(name);
    },
  },
};

export default user;
