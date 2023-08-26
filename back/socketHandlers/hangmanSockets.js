import findClientBySocketId from "../helpers/helpers.js";
import { findRoomByID } from "../helpers/roomHelpers.js";

export function hangmanSocket(io, clients, rooms) {
  io.on("connection", (socket) => {
    socket.on("restartGame", function () {
      let room = findRoomByID(socket.id, rooms);
      room.generateWord(room.language);
      room.leftLives = 7;
      room.openedChars = [];
      room.gameStatus = "";
      io.emit("UPDATE_ROOMS", rooms);
    });

    socket.on("checkChar", function (char) {
      let room = findRoomByID(socket.id, rooms);
      let charFound = false;
      let isFullString = true;
      let uniqueId = findClientBySocketId(socket.id, clients);
      if (room.openedChars.includes(char)) {
        return;
      }
      room.openedChars.push(char);

      for (let i = 0; i < room.word.length; i++) {
        if (room.word[i] === char) {
          charFound = true;
        }
      }
      if (charFound) {
        io.sockets.in(room.id).emit("CHAT_MESSAGE", {
          name: "SERVER",
          message:
            clients[uniqueId].name + " угадал букву " + char.toUpperCase(),
          type: "server",
          color: "green-500",
        });
      }
      for (let i = 0; i < room.word.length; i++) {
        if (!room.openedChars.includes(room.word[i])) {
          isFullString = false;
          break;
        }
      }
      if (isFullString) {
        room.gameStatus = `<p>${room.word}</p><p>Вы отгадали слово! Молодцы! :)</p>`;
        io.emit("UPDATE_ROOMS", rooms);
      }
      if (!charFound) {
        if (room.leftLives > 0) {
          room.leftLives--;
          io.sockets.in(room.id).emit("CHAT_MESSAGE", {
            name: "SERVER",
            message:
              clients[uniqueId].name + " назвал букву " + char.toUpperCase(),
            type: "server",
            color: "red-500",
          });
        } else {
          room.gameStatus = `<p>Вы проиграли :(</p> <p>Загаданное слово: ${room.word}</p>`;
          io.emit("UPDATE_ROOMS", rooms);
        }
      }
      io.emit("UPDATE_ROOMS", rooms);
    });
  });
}
