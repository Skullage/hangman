import findClientBySocketId from "../helpers/helpers.js";
import { findRoomByID, nextTurn } from "../helpers/roomHelpers.js";

export function hangmanSocket(io, clients, rooms) {
  io.on("connection", (socket) => {
    socket.on("restartGame", function () {
      let room = findRoomByID(socket.id, rooms);
      room.generateWord();
      room.leftLives = 7;
      room.openedChars = [];
      room.gameStatus = "";
      io.sockets.in(room.id).emit("UPDATE_ROOMS", rooms);
    });

    socket.on("checkChar", function (char) {
      let room = findRoomByID(socket.id, rooms);
      let charFound = false;
      let isFullString = true;
      let uniqueId = findClientBySocketId(socket.id, clients);
      if (room.turnUserID !== uniqueId) {
        return;
      }
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
          color: "red-500",
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
      }
      if (!charFound) {
        if (room.leftLives > 0) {
          room.leftLives--;
          io.sockets.in(room.id).emit("CHAT_MESSAGE", {
            name: "SERVER",
            message:
              clients[uniqueId].name + " назвал букву " + char.toUpperCase(),
            type: "server",
            color: "inherit",
          });
        } else {
          room.gameStatus = `<p>Вы проиграли :(</p> <p>Загаданное слово: ${room.word}</p>`;
        }
      }
      if (room.clients.length > 1) {
        nextTurn(room.id);
      }

      io.sockets.in(room.id).emit("UPDATE_ROOMS", rooms);
    });
  });
}
