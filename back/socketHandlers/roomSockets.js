import findClientBySocketId from "../helpers/helpers.js";
import {
  connectClientToRoom,
  findRoomByID,
  hostARoom,
  isClient,
  isInRoom,
  leaveRoom,
} from "../helpers/roomHelpers.js";

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
        data.language,
      );
      if (newRoomID !== false) {
        socket.emit("HOST");
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
          console.log(clientID);
          io.sockets.in(room.id).emit("CHAT_MESSAGE", {
            name: "SERVER",
            message: clients[uniqueIdKickedUser].name + " was kicked",
            type: "server",
            color: "#CCC",
          });
        }
      }
    });
    socket.on("JOIN", function (roomId, password = "", callback) {
      if (!isClient(socket)) return false;
      let uniqueId = findClientBySocketId(socket.id, clients);
      if (connectClientToRoom(socket, roomId, password, uniqueId)) {
        io.sockets.in(roomId).emit("CHAT_MESSAGE", {
          name: "SERVER",
          message: clients[uniqueId].name + " joined",
          type: "server",
          color: "#CCC",
        });
        callback(roomId);
      }
    });
    socket.on("LEAVE_ROOM", function (callback) {
      let uniqueId = findClientBySocketId(socket.id, clients);
      if (!isClient(socket)) return false;
      let roomID = clients[uniqueId].room;
      if (leaveRoom(socket, roomID)) {
        io.sockets.in(roomID).emit("CHAT_MESSAGE", {
          name: "SERVER",
          type: "server",
          message: clients[uniqueId].name + " left",
          color: "#CCC",
        });
        io.emit("UPDATE_ROOMS", rooms);
        callback();
      }
    });
  });
}
