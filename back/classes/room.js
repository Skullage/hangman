import { createRequire } from "module";
const require = createRequire(import.meta.url);
const words = require("../json/words.json");
const alphabet = require("../json/alphabet.json");
function Room(id, client, hostId, title, password, maxPlayers, options, game) {
  this.id = id;
  this.title = title;
  this.password = password;
  this.hostID = hostId;
  this.turnUserID = hostId;
  this.clients = [];
  this.maxPlayers = maxPlayers;
  this.options = options;
  this.game = game;
  this.gameStatus = { status: "" };
  this.blacklist = [];
  this.changeGame();
  this.addClient(client);
}

Room.prototype.changeGame = function () {
  switch (this.game) {
    case "Виселица":
      this.gameStatus.leftLives = 7;
      this.gameStatus.word = "";
      this.gameStatus.openedChars = [];
      this.gameStatus.alphabet = [];
      this.generateWord();
      break;
    case "Саймон":
      this.gameStatus.combination = [];
      break;
  }
};

Room.prototype.addClient = function (client) {
  this.clients.push(client);
  console.log(
    "Clients in room with id: " +
      this.id +
      "\n First Client:" +
      this.clients[0].name,
  );
};

Room.prototype.startGame = () => {};

Room.prototype.addElementToCombinationArray = function () {
  const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };
  this.gameStatus.combination.push(Math.round(getRandomNumber(1, 4)));
};

Room.prototype.generateWord = function () {
  let index = 0;
  switch (this.options.language) {
    case "Английский":
      index = Math.floor(Math.random() * words.en.length);
      this.gameStatus.word = words.en[index];
      this.gameStatus.alphabet = alphabet.en;
      break;
    case "Русский":
      index = Math.floor(Math.random() * words.ru.length);
      this.gameStatus.word = words.ru[index];
      this.gameStatus.alphabet = alphabet.ru;
      break;
  }
};

export default Room;
