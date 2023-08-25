import { v4 as uuidv4 } from "uuid";
import Room from "../classes/room.js";
import findClientBySocketId from "./helpers.js";
import { clients, rooms, io } from "../index.js";

export function hostARoom(
  socket,
  clientID,
  title,
  password,
  maxPlayers,
  language,
) {
  if (isInRoom(clients, clientID)) {
    sendError(socket, "You are already in a room");
    return false;
  } else if (clients[clientID] === undefined) {
    sendError(socket, "You are not known on the server");
    return false;
  }

  let roomID = uuidv4();
  rooms[roomID] = new Room(
    roomID,
    clients[clientID],
    clientID,
    title,
    password,
    maxPlayers,
    language,
  );

  try {
    socket.join(roomID);
    clients[clientID].isHost = true;
    clients[clientID].room = roomID;
    console.log(
      clients[clientID].name +
        " has created room: " +
        rooms[roomID].title +
        " with size: " +
        maxPlayers,
    );
    io.sockets.emit("UPDATE_ROOMS", rooms);
    getPeopleInRoom(clientID, roomID);
    return roomID;
  } catch (error) {
    console.log(socket.id + " FAILED to join room: " + roomID);
    sendError(socket, error);
    return roomID;
  }
}

export function connectClientToRoom(socket, roomID, password, clientID) {
  if (isInRoom(clients, clientID)) {
    sendError(socket, "You are already in a room");
    return false;
  } else if (clients[clientID] === undefined) {
    sendError(socket, "You are not known on the server");
    return false;
  } else if (!rooms[roomID]) {
    sendError(socket, "This room does not exist anymore");
    return false;
  } else if (rooms[roomID].maxPlayers <= rooms[roomID].clients.length) {
    sendError(socket, "This room is full");
    return false;
  } else if (rooms[roomID].password !== password) {
    sendError(socket, "Неверный пароль");
    return false;
  }
  try {
    socket.join(roomID);
    clients[clientID].isHost = false;
    clients[clientID].room = roomID;

    rooms[roomID].addClient(clients[clientID]);
    console.log(
      clients[clientID].name + " has joined room: " + rooms[roomID].title,
    );
    io.sockets.emit("UPDATE_ROOMS", rooms);
    getPeopleInRoom(clientID, roomID);
    return true;
  } catch (error) {
    sendError(socket, error);
    return false;
  }
}

export function leaveRoom(client, roomID) {
  let room = rooms[roomID];
  let roomClients = room.clients;
  let index = roomClients.findIndex((el) => {
    return el.id === client.id;
  });
  let isHost = roomClients[index].isHost;
  if (index !== -1) roomClients.splice(index, 1);
  if (room.clients.length <= 0) {
    deleteRoom(roomID);
  } else if (isHost) {
    roomClients[0].isHost = true;
    io.sockets.emit("UPDATE_ROOMS", rooms);
  }
  if (client.connected) {
    try {
      client.leave(roomID);
      let uniqueId = findClientBySocketId(client.id, clients);
      clients[uniqueId].isHost = null;
      clients[uniqueId].room = null;
    } catch (error) {
      sendError(client, error);
      return false;
    }
  }
  // Emit changes
  io.sockets.emit("UPDATE_ROOMS", rooms);
  return true;
}

export function deleteRoom(roomID) {
  delete rooms[roomID];
}

export function isClient(socket) {
  let uniqueId = findClientBySocketId(socket.id, clients);
  if (clients[uniqueId] === undefined) {
    socket.emit("ERROR", {
      message: "User unknown. Maybe you lost connection. Please join again.",
      type: "error",
    });
    return false;
  } else {
    return true;
  }
}

export function isInRoom(clients, clientID) {
  let uniqueId = findClientBySocketId(clientID, clients);
  if (clients[uniqueId] !== undefined) {
    if ("room" in clients[uniqueId]) {
      if (clients[uniqueId].room !== null) {
        return true;
      }
    } else {
      return false;
    }
  }
}

export function getPeopleInRoom(clientID, roomID) {
  // var room = findRoomByID(clientID, rooms);
  if (rooms[roomID] != null || rooms[roomID] !== undefined) {
    io.sockets.in(roomID).emit("GET_ROOM_INFO", rooms[roomID]);
  }
}

export function findRoomByID(clientID, rooms) {
  let key, room;
  for (key in rooms) {
    if (rooms.hasOwnProperty(key)) {
      room = rooms[key];
      for (let i = 0; i < room.clients.length; i++) {
        if (room.clients[i].id === clientID) {
          return room;
        }
      }
    }
  }
  return null;
}

export function sendError(socket, err) {
  socket.emit("ERROR", {
    message: err,
    type: "error",
  });
}
