import findClientBySocketId from "../helpers/helpers.js";

const getCurrentTime = () => {
  let currentDate = new Date();
  return `${currentDate.getHours()}:${currentDate.getMinutes()}`;
};

export function chatSocket(io, clients) {
  io.on("connection", (socket) => {
    socket.on(
      "sendMessage",
      function ({ name, message, color, type, time = getCurrentTime }) {
        let uniqueId = findClientBySocketId(socket.id, clients);
        let roomID = clients[uniqueId].room;
        io.sockets.in(roomID).emit("CHAT_MESSAGE", {
          name: name,
          message: message,
          color: color,
          type: type,
          time: time,
        });
      },
    );
  });
}
