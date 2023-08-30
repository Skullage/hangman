import { createStore } from "vuex";
import SocketioService from "../api/socketio.service.js";

const store = createStore({
  state() {
    return {
      roomId: "",
      rooms: undefined,
      username: localStorage.getItem("username") || null,
      themeMode: "light",
      messages: [],
      errors: [],
      passwordModal: {
        isShow: false,
        password: "",
        resolvePromise: undefined,
        rejectPromise: undefined,
      },
      confirmModal: {
        isShow: false,
        title: "",
        msg: "",
        resolvePromise: undefined,
        rejectPromise: undefined,
      },
      userId: "",
      turnTimer: 0,
      timer: undefined,
    };
  },
  getters: {
    isLogined(state) {
      return state.username !== null;
    },
    getUsers(state, getters) {
      return getters.getRoom ? getters.getRoom.clients : null;
    },
    getRoom(state) {
      return state.rooms[state.roomId];
    },
    getWord(state, getters) {
      if (getters.getRoom) {
        let buffer = "";
        getters.getRoom.word.split("").forEach((el) => {
          if (!getters.getRoom.openedChars.includes(el)) {
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
    getRoomTitle(state, getters) {
      return getters.getRoom ? getters.getRoom.title : null;
    },
    getCharSlots(state, getters) {
      let buffer = [];
      if (getters.getRoom) {
        getters.getRoom.alphabet.forEach((el) => {
          buffer.push({
            char: el,
            disabled: getters.getRoom.openedChars.includes(el),
          });
        });
        return buffer;
      } else {
        return null;
      }
    },
    getLivesLast(state, getters) {
      return getters.getRoom ? getters.getRoom.leftLives : null;
    },
    getLivesClass(state, getters) {
      let lives = getters.getRoom ? getters.getRoom.leftLives : null;
      return `step-${lives}`;
    },
    isGamePaused(state, getters) {
      return getters.getRoom ? getters.getRoom.gameStatus !== "" : null;
    },
    getGameStatus(state, getters) {
      return getters.getRoom ? getters.getRoom.gameStatus : null;
    },
    isRoomsEmpty(state) {
      for (const prop in state.rooms) {
        if (Object.hasOwn(state.rooms, prop)) {
          return false;
        }
      }
      return true;
    },
    isUserHost(state, getters) {
      return getters.getRoom === state.userId;
    },
    getTurnUser(state, getters) {
      return getters.getRoom.clients.find(
        (el) => el.uniqueId === getters.getRoom.turnUserID,
      );
    },
  },
  mutations: {
    logout(state) {
      state.username = null;
      localStorage.removeItem("username");
    },
    getRooms(state, rooms) {
      state.rooms = rooms;
    },
    setUsername(state, name) {
      state.username = name;
      localStorage.setItem("username", state.username);
      SocketioService.newUser({ name: store.state.username, color: "black" });
    },
    setRoomId(state, id) {
      state.roomId = id;
    },
    updateRoom(state, data) {
      state.rooms[state.roomId] = data;
    },
    toggleTheme(state, mode) {
      state.themeMode = mode;
      localStorage.setItem("theme", mode);
      if (mode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    getMessage(state, data) {
      state.messages.push({
        name: data.name,
        msg: data.message,
        color: data.color,
      });
    },
    addError(state, { type, msg }) {
      state.errors.push({ type, msg });
    },
    closeError(state, index) {
      state.errors.splice(index, 1);
    },
    startTimer(state, timeout) {
      state.turnTimer = timeout / 1000;
      if (state.timer !== undefined) {
        clearInterval(state.timer);
      }

      state.timer = setInterval(() => {
        state.turnTimer--;
        if (state.turnTimer === 0) {
          state.turnTimer = timeout / 1000;
        }
      }, 1000);
    },
  },
  actions: {
    async showModal({ state }) {
      state.passwordModal.isShow = true;
      return new Promise((resolve, reject) => {
        state.passwordModal.resolvePromise = resolve;
        state.passwordModal.rejectPromise = reject;
      });
    },
    async showConfirm({ state }, options = {}) {
      state.confirmModal.title = options.title;
      state.confirmModal.msg = options.msg;
      state.confirmModal.isShow = true;
      return new Promise((resolve, reject) => {
        state.confirmModal.resolvePromise = resolve;
        state.confirmModal.rejectPromise = reject;
      });
    },
  },
});

export default store;
