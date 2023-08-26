import findClientBySocketId from "../helpers/helpers.js";

export function chatSocket(io, clients) {
  io.on("connection", (socket) => {
    socket.on("sendMessage", function (data) {
      let uniqueId = findClientBySocketId(socket.id, clients);
      let roomID = clients[uniqueId].room;
      io.sockets.in(roomID).emit("CHAT_MESSAGE", {
        name: data.name,
        message: data.message,
        color: data.color,
      });
    });
  });
}
