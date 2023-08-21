import { v4 as uuidv4 } from 'uuid';
import Room from "../classes/room.js"
import findClientBySocketId from './helpers.js'
import {clients, rooms, io } from '../index.js'


  export function hostARoom(socket, clientID, title, maxPlayers, language) {
    if (isInRoom(clients, clientID)) {
      sendError(socket, "You are already in a room");
      return false;
    } else if (clients[clientID] === undefined) {
      console.log("hostAroom: client not known");
      sendError(socket, "You are not known on the server");
      return false;
    }

    let roomID = uuidv4();
    rooms[roomID] = new Room(roomID, clients[clientID], clientID, title, maxPlayers, language);

    console.log("new room created, now joining");

    try {
      socket.join(roomID)
      clients[clientID].isHost = true;
      clients[clientID].room = roomID;
      console.log(clients[clientID].name + " has created room: " +
        rooms[roomID].title + " with size: " + maxPlayers);
      io.sockets.emit("UPDATE_ROOMS", rooms);
      getPeopleInRoom(clientID, roomID);
      return roomID;
    } catch (error) {
      console.log(socket.id + " FAILED to join room: " + roomID);
      sendError(socket, error);
      return roomID;
    }
  }

export function connectClientToRoom(socket, roomID, clientID) {
  console.log(rooms[roomID].clients)
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
      sendError(socket, "This room is full")
      return false;
    }

    try {
      socket.join(roomID)
      clients[clientID].isHost = false;
      clients[clientID].room = roomID;

      rooms[roomID].addClient(clients[clientID]);
      console.log(
          clients[clientID].name +
          " has joined room: " +
          rooms[roomID].title
      );
      io.sockets.emit("UPDATE_ROOMS", rooms);
      getPeopleInRoom(clientID, roomID);
      return true;
    } catch (error) {
      sendError(socket, error);
      return false;
    }
  }

  /**
   * leave room in socket logic, remove client from room.clients[], check if room is now empty and update Room List and Room Info
   */
  export function leaveRoom(client, roomID) {
    //socket disconnected abruptly. No .leave() is needed then
    let room = rooms[roomID]
    // deletes client from room.clients[Client{},Client{},Client{}] array
    let roomClients = room.clients;
    let index = roomClients.findIndex(function (o) {
      return o.id === client.id;
    })
    if (index !== -1) roomClients.splice(index, 1);

    //if the host leaves, all others are kicked and the room is deleted
    if (client.isHost) {
      io.sockets.in(roomID).emit("HOST_LEFT");
      io.sockets.emit("UPDATE_ROOMS", rooms);
    }


    // check if room now empty => delete
    if (room.clients.length <= 0) {
      deleteRoom(roomID);
    }

    // Emit changes
    io.sockets.emit("UPDATE_ROOMS", rooms);
    io.sockets.in(roomID).emit("GET_ROOM_INFO", room);

    if (client.connected) {

      client.leave(roomID, function (err) {
        if (!err) {

          // if the Client is still online, update Client object
          if (client) {
            client.isHost = null;
            client.ready = false;
            client.room = null;
          }

        } else {
          sendError(client, err);
          return false;
        }
      });
    }
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
        type: "error"
      });
      return false;
    } else {
      return true;
    }
  }

export function isInRoom(clients, clientID) {
    let uniqueId = findClientBySocketId(clientID, clients);
    // if the client is already a host, or already connected to a room
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
      console.log("~getpeopleinroom ", roomID);
      io.sockets.in(roomID).emit("GET_ROOM_INFO", rooms[roomID]);
    }
  }

  /**
   * Find a room by providing the id of a client
   */
  export function findRoomByID(clientID, rooms) {
    let key, room;
    for (key in rooms) {
      if (rooms.hasOwnProperty(key)) {
        room = rooms[key];
        //if (room.hostID === hostID) {
        //    return room;
        //}
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
    console.log(err)
    socket.emit("ERROR", {
      message: err,
      type: "error"
    });
  }
