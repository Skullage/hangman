import findClientBySocketId from "../helpers/helpers.js";
import { sendMessage } from "../helpers/chatHelpers.js";

export function chatSocket(io, clients) {
  io.on("connection", (socket) => {
    socket.on("sendMessage", function ({ name, message, color, type }) {
      let uniqueId = findClientBySocketId(socket.id, clients);
      let roomID = clients[uniqueId].room;
      sendMessage({
        room: roomID,
        name: name,
        message: message,
        type: type,
        color: color,
      });
    });
  });
}
