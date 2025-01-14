import express from "express";
import https from "https";
import http from "http";
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
import fs from "fs";
import { sendMessage } from "./helpers/chatHelpers.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

/*
const options = {
  key: fs.readFileSync("/etc/ssl/play-together.ru/private.key"),
  cert: fs.readFileSync("/etc/ssl/play-together.ru/cert.crt"),
  ca: fs.readFileSync("/etc/ssl/play-together.ru/chain.crt"),
};
*/

app.get("/", (req, res) => {
  res.send("<h1>Hey Socket.io</h1>");
});

app.use(express.json({ limit: "50kb" }));
app.use(cors());
app.set("trust proxy", "8.8.8.8");
app.use(Router);

const httpServer = http.createServer(app);
//const httpsServer = https.createServer(options, app);

export const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

export let rooms = {};
export let clients = {};
export const turnTimeout = 5000;

io.on("connection", (socket) => {
  console.log("New connection: " + socket.id);

  socket.on("NEW_USER", function (data) {
    let uniqueId = uuidv4();
    data.uniqueId = uniqueId;
    data.id = socket.id;
    console.log(socket.id + " is now known as: " + data.username);
    clients[uniqueId] = new Client(
      socket.id,
      uniqueId,
      data.username,
      null,
      null,
    );
    socket.emit("NEW_USER", uniqueId);
    socket.emit("UPDATE_ROOMS", rooms);
  });

  socket.on("CHANGE_NAME", function (name) {
    let uniqueId = findClientBySocketId(socket.id, clients);
    clients[uniqueId].changeName(name);
    console.log(socket.id + " is now known as: " + name);
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
        sendMessage({
          room: roomID,
          name: "SERVER",
          type: "server",
          message: clients[uniqueId].name + " вышел",
          color: "text-inherit",
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
