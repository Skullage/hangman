const room = {
  namespaced: true,
  state: () => ({
    roomId: null,
    rooms: null,
    turnTimer: 0,
    timer: undefined,
  }),
  getters: {
    getUsers(state, getters) {
      return getters.getRoom ? getters.getRoom.clients : null;
    },
    getRoom(state) {
      return state.rooms[state.roomId];
    },
    getRoomTitle(state, getters) {
      return getters.getRoom ? getters.getRoom.title : null;
    },
    isGamePaused(state, getters) {
      return getters.getRoom ? getters.getRoom.gameStatus.status !== "" : null;
    },
    getGameStatus(state, getters) {
      return getters.getRoom ? getters.getRoom.gameStatus.status : null;
    },
    getRoomGame(state, getters) {
      return getters.getRoom ? getters.getRoom.game : null;
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
      return getters.getRoom.hostID === state.userId;
    },
    isUserTurn(state, getters) {
      return state.userId === getters.getRoom.turnUserID;
    },
    getUserSlot(state, getters) {
      return getters.getRoom.clients.findIndex(
        (el) => el.uniqueId === state.userId,
      );
    },
    getUserColor: () => (index) => {
      switch (index) {
        case 0:
          return "red";
        case 1:
          return "green";
        case 2:
          return "blue";
        case 3:
          return "yellow";
        default:
          return "inherit";
      }
    },
  },
  mutations: {
    setRooms(state, rooms) {
      state.rooms = rooms;
    },
    setRoomId(state, id) {
      state.roomId = id;
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
};

export default room;
