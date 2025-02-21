import findClientBySocketId from "../helpers/helpers.js";
import { findRoomByID } from "../helpers/roomHelpers.js";

export function wordleSocket(io, clients, rooms) {
  io.on("connection", (socket) => {
    socket.on("restartGame", function () {
      let room = findRoomByID(socket.id, rooms);
      room.gameStatus.word = "";
      room.gameStatus.leftLives = 6;
      room.gameStatus.status = "";
      room.generateWord();
      io.sockets.in(room.id).emit("UPDATE_ROOMS", rooms);
    });

    socket.on("checkWord", function (word) {
    let room = findRoomByID(socket.id, rooms);
    let uniqueId = findClientBySocketId(socket.id, clients);
    if (room.turnUserID !== uniqueId) {
    return;
    }

    if (room.gameStatus.word === word) {
        room.gameStatus.status = `<p>${room.gameStatus.word}</p><p>Вы отгадали слово! Молодцы! :)</p>`;
    } else {
        if (room.gameStatus.leftLives > 1) {
            room.gameStatus.leftLives--;
        } else {
            room.gameStatus.status = `<p>Вы проиграли :(</p> <p>Загаданное слово: ${room.gameStatus.word}</p>`;
        }
    }

    io.sockets.in(room.id).emit("UPDATE_ROOMS", rooms);
    });
  });
}
