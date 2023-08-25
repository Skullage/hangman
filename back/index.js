import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import Router from "./routes/routes.js";
import { v4 as uuidv4 } from "uuid";
import Client from "./classes/client.js";
import findClientBySocketId from "./helpers/helpers.js";
import {
  hostARoom,
  isClient,
  connectClientToRoom,
  leaveRoom,
  isInRoom,
  findRoomByID,
} from "./helpers/roomHelpers.js";

const app = express();
const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origins: ["http://localhost:8080"],
  },
});

app.get("/", (req, res) => {
  res.send("<h1>Hey Socket.io</h1>");
});

app.use(express.json());
app.use(cors());
app.set("trust proxy", "8.8.8.8");
app.use(Router);

export let rooms = {};
export let clients = {};

io.on("connection", (socket) => {
  console.log("New connection: " + socket.id);

  socket.on("NEW_USER", function (data) {
    let uniqueId = uuidv4();
    data.uniqueId = uniqueId;
    data.id = socket.id;
    console.log(socket.id + " is now known as: " + data.username);
    clients[uniqueId] = new Client(socket.id, data.username, null, null);
    io.emit("NEW_USER", clients[uniqueId]);
    data.name = data.username;
    socket.emit("JOINED_SERVER", data);
    socket.emit("UPDATE_ROOMS", rooms);
  });

  socket.on("showRooms", function (callback) {
    callback(rooms);
  });

  socket.on("restartGame", function () {
    let room = findRoomByID(socket.id, rooms);
    room.generateWord(room.language);
    room.leftLives = 5;
    room.openedChars = [];
    room.gameStatus = "";
    io.emit("UPDATE_ROOMS", rooms);
  });

  socket.on("checkChar", function (char) {
    let room = findRoomByID(socket.id, rooms);
    let charFound = false;
    let isFullString = true;
    let uniqueId = findClientBySocketId(socket.id, clients);
    room.openedChars.push(char);

    for (let i = 0; i < room.word.length; i++) {
      if (room.word[i] === char) {
        charFound = true;
        io.sockets.in(room.id).emit("CHAT_MESSAGE", {
          name: "SERVER",
          message:
            clients[uniqueId].name + " угадал букву " + char.toUpperCase(),
          type: "server",
          color: "green-500",
        });
      }
    }
    for (let i = 0; i < room.word.length; i++) {
      if (!room.openedChars.includes(room.word[i])) {
        isFullString = false;
        break;
      }
    }
    if (isFullString) {
      room.gameStatus = "Вы отгадали слово! Молодцы! :)";
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

  socket.on("sendMessage", function (data) {
    let uniqueId = findClientBySocketId(socket.id, clients);
    let roomID = clients[uniqueId].room;
    io.sockets.in(roomID).emit("CHAT_MESSAGE", {
      name: data.name,
      message: data.message,
      color: data.color,
    });
  });

  socket.on("disconnect", function () {
    let uniqueId = findClientBySocketId(socket.id, clients);
    if (!clients[uniqueId]) {
      console.log("Disconnected immediately from room. Client wasn't known");
      return false;
    }
    clients[uniqueId].isConnected = false;

    let roomID = clients[uniqueId].room;

    io.sockets.in(roomID).emit("USER_DISCONNECTING", clients[uniqueId]);
    if (!clients[uniqueId].isConnected) {
      if (isInRoom(clients, socket.id)) {
        io.sockets.in(roomID).emit("CHAT_MESSAGE", {
          name: "SERVER",
          type: "server",
          message: clients[uniqueId].name + " left",
          color: "#CCC",
        });
        leaveRoom(socket, roomID);
      }
      io.emit("UPDATE_ROOMS", rooms);
      clients[uniqueId] = null;
    } else {
      console.log("Didn't disconnect from Room, reconnected first");
      console.log(clients[uniqueId]);
    }
  });
});

httpServer.listen(3000, () => {
  console.log("listening on *:3000");
});
