import { io } from "socket.io-client";
import { VUE_APP_SOCKET_ENDPOINT } from "../config/config.js";
import store from "../store/index.js";
import { useRouter } from "vue-router";

class SocketioService {
  socket;
  router;
  constructor() {}

  setupSocketConnection() {
    // @ts-ignore
    this.router = useRouter();
    this.socket = io(VUE_APP_SOCKET_ENDPOINT);
    this.socket.on("UPDATE_ROOMS", (data) => {
      store.state.rooms = data;
    });
    this.socket.on("CHAT_MESSAGE", (data) => {
      store.commit("getMessage", data);
    });
    this.socket.on("ERROR", (data) => {
      store.commit("addError", { type: data.type, msg: data.message });
    });
    this.socket.on("NEW_USER", (userId) => {
      store.state.userId = userId;
    });
    this.socket.on("KICKED", async () => {
      this.router.push("/");
      store.commit("addError", { type: "info", msg: "Вас выгнали из комнаты" });
    });
  }

  restartGame() {
    this.socket.emit("restartGame");
  }

  newUser(data) {
    this.socket.emit("NEW_USER", {
      username: data.name,
    });
  }
  showRooms(callback) {
    this.socket.emit("showRooms", callback);
  }
  leaveRoom(callback) {
    this.socket.emit("LEAVE_ROOM", callback);
    store.state.messages = [];
  }
  joinRoom(roomId, password = "", callback) {
    this.socket.emit("JOIN", roomId, password, callback);
    store.commit("setRoomId", roomId);
  }
  checkChar(char, callback) {
    this.socket.emit("checkChar", char, callback);
  }
  hostRoom(data, callback) {
    this.socket.emit("HOST", data, callback);
  }

  sendMessage(data) {
    this.socket.emit("sendMessage", data);
  }

  kickUser(userId) {
    this.socket.emit("kickUser", userId);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketioService();
