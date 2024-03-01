import { io } from "socket.io-client";
import { VUE_APP_SOCKET_ENDPOINT } from "../config/config.js";
import store from "../store/index.js";
import { useRouter } from "vue-router";

class SocketioService {
  socket;
  router;
  constructor() {}

  setupSocketConnection() {
    this.router = useRouter();
    this.socket = io(VUE_APP_SOCKET_ENDPOINT);

    this.socket.on("UPDATE_ROOMS", (data) => {
      store.state.room.rooms = data;
    });
    this.socket.on("CHAT_MESSAGE", (data) => {
      store.commit("chat/getMessage", data);
    });
    this.socket.on("ERROR", (data) => {
      store.commit("notification/addNotification", {
        type: data.type,
        msg: data.message,
      });
    });
    this.socket.on("NEW_USER", (userId) => {
      store.state.room.userId = userId;
    });
    this.socket.on("KICKED", async () => {
      this.router.push("/");
      store.commit("chat/clearChat");
      store.commit("notification/addNotification", {
        type: "info",
        msg: "Вас выгнали из комнаты",
      });
    });
    this.socket.on("startTurnTimer", (timeout) => {
      store.commit("room/startTimer", timeout);
    });
    this.socket.on("connect", () => {
      if (store.getters["user/isLogined"]) {
        this.newUser({ name: store.state.user.username });
      }
    });
    this.socket.on("connect_error", () => {
      store.commit("notification/addNotification", {
        type: "error",
        msg: "Сервер не доступен",
      });
    });
    this.socket.on("disconnect", () => {
      store.commit("notification/addNotification", {
        type: "error",
        msg: "Соединение было разорвано. Попробуйте  обновить страницу",
      });
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
  changeName(name) {
    this.socket.emit("CHANGE_NAME", name);
  }
  showRooms(callback) {
    this.socket.emit("showRooms", callback);
  }
  leaveRoom(callback) {
    this.socket.emit("LEAVE_ROOM", callback);
    store.commit("chat/clearChat");
  }
  joinRoom(roomId, password = "", callback) {
    this.socket.emit("JOIN", roomId, password, callback);
    store.commit("room/setRoomId", roomId);
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
      store.commit("notification/addNotification", {
        type: "error",
        msg: "Соединение было разорвано. Попробуйте  обновить страницу",
      });
    }
  }
}

export default new SocketioService();
