import { io } from "../index.js";

export const getCurrentTime = () => {
  let currentDate = new Date();
  let currentHours =
    currentDate.getHours() > 9
      ? currentDate.getHours()
      : "0" + currentDate.getHours();
  let currentMinutes =
    currentDate.getMinutes() > 9
      ? currentDate.getMinutes()
      : "0" + currentDate.getMinutes();
  return `${currentHours}:${currentMinutes}`;
};

export function sendMessage({
  room,
  name,
  message,
  type,
  smileFolder,
  color,
  time = getCurrentTime(),
}) {
  io.sockets.in(room).emit("CHAT_MESSAGE", {
    name: name,
    message: message,
    type: type,
    smileFolder: smileFolder,
    color: color,
    time: time,
  });
}
