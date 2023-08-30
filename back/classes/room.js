import { createRequire } from "module";
const require = createRequire(import.meta.url);
const words = require("../json/words.json");
const alphabet = require("../json/alphabet.json");
function Room(id, client, hostId, readableName, password, size, game) {
  this.id = id;
  this.title = readableName;
  this.password = password;
  this.hostID = hostId;
  this.turnUserID = hostId;
  this.clients = [];
  this.openedChars = [];
  this.leftLives = 7;
  this.maxPlayers = size;
  this.word = "";
  this.alphabet = [];
  this.language = game;
  this.gameStatus = "";
  this.addClient(client);
  this.generateWord();
}

Room.prototype.addClient = function (client) {
  this.clients.push(client);
  console.log(
    "Clients in room with id: " +
      this.id +
      "\n First Client:" +
      this.clients[0].name,
  );
};

Room.prototype.generateWord = function () {
  if (this.language === "Английский") {
    let index = Math.floor(Math.random() * words.en.length);
    this.word = words.en[index];
    this.alphabet = alphabet.en;
  } else {
    let index = Math.floor(Math.random() * words.ru.length);
    this.word = words.ru[index];
    this.alphabet = alphabet.ru;
  }
};

export default Room;
