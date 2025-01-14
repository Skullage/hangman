import findClientBySocketId from "../helpers/helpers.js";
import { findRoomByID, nextTurn } from "../helpers/roomHelpers.js";
import { sendMessage } from "../helpers/chatHelpers.js";

export function simonSocket(io, clients, rooms) {
  io.on("connection", (socket) => {
    socket.on("restartGame", function () {
      let room = findRoomByID(socket.id, rooms);
      room.generateWord();
      room.gameStatus.leftLives = 7;
      room.gameStatus.openedChars = [];
      room.gameStatus.status = "";
      io.sockets.in(room.id).emit("UPDATE_ROOMS", rooms);
    });
  });
}
