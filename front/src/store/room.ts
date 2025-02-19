import Module from 'vuex';
import { User, Room, RoomState} from '@/types/modules/room';

const room: Module<RoomState, any> = {
  namespaced: true,
  state: (): RoomState => ({
    roomId: null,
    rooms: null,
    turnTimer: 0,
    timer: undefined,
  }),
  getters: {
    getUsers(state, getters): User[] | null {
      return getters.getRoom?.clients || null;
    },
    getRoom(state): Room | null {
      return state.rooms?.[state.roomId] || null;
    },
    isGamePaused(state, getters): boolean | null {
      return getters.getRoom ? getters.getRoom.gameStatus.status !== "" : null;
    },
    isRoomsEmpty(state): boolean {
      return !state.rooms || Object.keys(state.rooms).length === 0;
    },
    isUserHost(state, getters): boolean | null {
      return getters.getRoom?.hostID === state.userId || null;
    },
    isUserTurn(state, getters): boolean | null {
      return getters.getRoom?.turnUserID === state.userId || null;
    },
    getUserSlot(state, getters): number {
      return getters.getRoom?.clients.findIndex((el: User) => el.uniqueId === state.userId) ?? -1;
    },
    getUserColor: () => (index: number): string => {
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
    setRooms(state, rooms: Record<string, Room>) {
      state.rooms = rooms;
    },
    setRoomId(state, id: string) {
      state.roomId = id;
    },
    updateRoomInfo(state, data: Room) {
      state.rooms[state.roomId] = data;
    },
    startTimer(state, timeout: number) {
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