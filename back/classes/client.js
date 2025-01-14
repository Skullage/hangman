const Client = function (id, uniqueId, name, room, isHost) {
  this.isConnected = true;
  this.id = id;
  this.uniqueId = uniqueId;
  this.name = name;
  this.room = room;
  this.isHost = isHost;
  this.isReady = false;
};

Client.prototype.changeName = function (name) {
  this.name = name;
};

Client.prototype.toggleReadyStatus = function () {
  this.isReady = !this.isReady;
};

export default Client;
