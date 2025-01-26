import findClientBySocketId from "../helpers/helpers.js";
import {
  connectClientToRoom,
  findRoomByID,
  hostARoom,
  isAllClientsReady,
  isClient,
  isInRoom,
  isRoomExist,
  leaveRoom,
  sendError,
  startTurnTimer,
} from "../helpers/roomHelpers.js";
import { sendMessage } from "../helpers/chatHelpers.js";

export function roomSocket(io, clients, rooms) {
  io.on("connection", (socket) => {
    socket.on("showRooms", function (callback) {
      callback(rooms);
    });
    socket.on("HOST", function (data, callback) {
      let uniqueId = findClientBySocketId(socket.id, clients);
      let newRoomID = hostARoom(
        socket,
        uniqueId,
        data.title,
        data.password,
        data.maxPlayers,
        data.options,
        data.game,
      );
      if (newRoomID !== false) {
        io.emit("UPDATE_ROOMS", rooms);
        callback(newRoomID);
      }
    });
    socket.on("kickUser", async function (clientID) {
      let toBeKicked = await (
        await io.fetchSockets()
      ).find((el) => el.id === clientID);

      if (toBeKicked === undefined) return false;
      if (!isClient(toBeKicked)) return false;
      if (!isInRoom(clients, toBeKicked.id)) return false;

      let uniqueId = findClientBySocketId(socket.id, clients);

      let uniqueIdKickedUser = findClientBySocketId(toBeKicked.id, clients);

      if (clients[uniqueId].isHost) {
        let room = findRoomByID(toBeKicked.id, rooms);

        if (leaveRoom(toBeKicked, room.id)) {
          io.to(toBeKicked.id).emit("KICKED");
          room.blacklist.push(uniqueIdKickedUser);
          sendMessage({
            room: room.id,
            name: "SERVER",
            message: clients[uniqueIdKickedUser].name + " был выгнан с комнаты",
            type: "server",
            color: "#CCC",
          });
        }
      }
    });
    socket.on("JOIN", function (roomId, password = "", callback) {
      if (!isClient(socket)) return false;
      let uniqueId = findClientBySocketId(socket.id, clients);
      if (!isRoomExist(roomId, rooms)) {
        sendError(socket, "Комната не существует");
        return false;
      }
      if (rooms[roomId].blacklist.includes(uniqueId)) {
        sendError(socket, "Вы были выгнаны с этой комнаты");
        return false;
      }
      if (connectClientToRoom(socket, roomId, password, uniqueId)) {
        sendMessage({
          room: roomId,
          name: "SERVER",
          message: clients[uniqueId].name + " зашел в комнату",
          type: "server",
          color: "#CCC",
        });
        startTurnTimer(roomId);
        io.emit("UPDATE_ROOMS", rooms);
        callback(roomId);
      } else {
        callback(false);
      }
    });
    socket.on("LEAVE_ROOM", function (callback) {
      let uniqueId = findClientBySocketId(socket.id, clients);
      if (!isClient(socket)) return false;
      let roomID = clients[uniqueId].room;
      if (leaveRoom(socket, roomID)) {
        sendMessage({
          room: roomID,
          name: "SERVER",
          type: "server",
          message: clients[uniqueId].name + " покинул комнату",
          color: "#CCC",
        });
        io.emit("UPDATE_ROOMS", rooms);
        callback();
      }
    });
    socket.on("toggleReadyStatus", () => {
      let uniqueId = findClientBySocketId(socket.id, clients);
      let roomID = clients[uniqueId].room;
      clients[uniqueId].toggleReadyStatus();
      io.emit("UPDATE_ROOMS", rooms);
      io.sockets.in(roomID).emit("GET_ROOM_INFO", rooms[roomID]);
      rooms[roomID].clients.forEach((el) => {
        if (!el.isReady) {
          return false;
        }
      });
      if (isAllClientsReady(roomID)) {
        rooms[roomID].startGame();
      }
    });
  });
}
