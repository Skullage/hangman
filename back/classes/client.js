//a Client class in the server
const Client = function (id, name, color, room, isHost) {
    this.isConnected = true;
    this.id = id;
    this.name = name;
    this.color = color;
    this.room = room;
    this.ready = false;
    this.isHost = isHost;
};

export default Client;
