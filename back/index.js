import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import Router from "./routes/routes.js";
import { v4 as uuidv4 } from "uuid";
import Client from "./classes/client.js";
import findClientBySocketId from "./helpers/helpers.js";
import { leaveRoom, isInRoom } from "./helpers/roomHelpers.js";
import { roomSocket } from "./socketHandlers/roomSockets.js";
import { hangmanSocket } from "./socketHandlers/hangmanSockets.js";
import { chatSocket } from "./socketHandlers/chatSockets.js";

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
    socket.emit("NEW_USER", uniqueId);
    data.name = data.username;
    socket.emit("JOINED_SERVER", data);
    socket.emit("UPDATE_ROOMS", rooms);
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

roomSocket(io, clients, rooms);
hangmanSocket(io, clients, rooms);
chatSocket(io, clients);

httpServer.listen(3000, () => {
  console.log("listening on *:3000");
});
