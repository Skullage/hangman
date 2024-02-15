import findClientBySocketId from "../helpers/helpers.js";
import { findRoomByID, nextTurn } from "../helpers/roomHelpers.js";
import { sendMessage } from "../helpers/chatHelpers.js";

export function hangmanSocket(io, clients, rooms) {
  io.on("connection", (socket) => {
    socket.on("restartGame", function () {
      let room = findRoomByID(socket.id, rooms);
      room.generateWord();
      room.gameStatus.leftLives = 7;
      room.gameStatus.openedChars = [];
      room.gameStatus.status = "";
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
      if (room.gameStatus.openedChars.includes(char)) {
        return;
      }
      room.gameStatus.openedChars.push(char);

      for (let i = 0; i < room.gameStatus.word.length; i++) {
        if (room.gameStatus.word[i] === char) {
          charFound = true;
        }
      }
      if (charFound) {
        sendMessage({
          room: room.id,
          name: "SERVER",
          message:
            clients[uniqueId].name + " угадал букву " + char.toUpperCase(),
          type: "server",
          color: "inherit",
        });
      }
      for (let i = 0; i < room.gameStatus.word.length; i++) {
        if (!room.gameStatus.openedChars.includes(room.gameStatus.word[i])) {
          isFullString = false;
          break;
        }
      }
      if (isFullString) {
        room.gameStatus.status = `<p>${room.gameStatus.word}</p><p>Вы отгадали слово! Молодцы! :)</p>`;
      }
      if (!charFound) {
        if (room.gameStatus.leftLives > 0) {
          room.gameStatus.leftLives--;
          sendMessage({
            room: room.id,
            name: "SERVER",
            message:
              clients[uniqueId].name + " назвал букву " + char.toUpperCase(),
            type: "server",
            color: "inherit",
          });
        } else {
          room.gameStatus.status = `<p>Вы проиграли :(</p> <p>Загаданное слово: ${room.gameStatus.word}</p>`;
        }
      }
      if (room.clients.length > 1) {
        nextTurn(room.id);
      }

      io.sockets.in(room.id).emit("UPDATE_ROOMS", rooms);
    });
  });
}
