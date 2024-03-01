const Client = function (id, uniqueId, name, room, isHost) {
  this.isConnected = true;
  this.id = id;
  this.uniqueId = uniqueId;
  this.name = name;
  this.room = room;
  this.isHost = isHost;
};

Client.prototype.changeName = function (name) {
  this.name = name;
};

export default Client;
