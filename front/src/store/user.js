import SocketioService from "../api/socketio.service.js";

const user = {
  namespaced: true,
  state: () => ({
    username: localStorage.getItem("username") ?? null,
  }),
  getters: {
    isLogined(state) {
      return state.username !== null;
    },
  },
  mutations: {
    logout(state) {
      state.username = null;
      localStorage.removeItem("username");
    },
    auth(state, name) {
      state.username = name;
      localStorage.setItem("username", state.username);
      SocketioService.setupSocketConnection();
    },
    changeNickname(state, name) {
      state.username = name;
      localStorage.setItem("username", state.username);
      SocketioService.changeName(name);
    },
  },
};

export default user;
