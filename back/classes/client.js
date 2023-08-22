//a Client class in the server
const Client = function (id, name, room, isHost) {
    this.isConnected = true;
    this.id = id;
    this.name = name;
    this.room = room;
    this.isHost = isHost;
};

export default Client;
