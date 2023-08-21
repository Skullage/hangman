import { createRequire } from "module";
const require = createRequire(import.meta.url);
const words = require('../json/words.json')
const alphabet = require('../json/alphabet.json')
function Room(id, client, hostId, readableName, size, game) {
    this.id = id;
    this.title = readableName;
    this.hostID = hostId;
    this.clients = [];
    this.openedChars = [];
    this.leftLives = 5;
    this.maxPlayers = size;
    this.word = '';
    this.alphabet = [];
    this.language = game;
    this.gameStatus = '';
    this.addClient(client);
    this.generateWord(game);
}

Room.prototype.addClient = function (client) {
    this.clients.push(client);
    console.log(
        "Clients in room with id: " +
        this.id +
        "\n First Client:" +
        this.clients[0].name
    );
};

Room.prototype.generateWord = function (language) {
    if(language === 'Английский') {
        let index = Math.floor(Math.random() * words.en.length);
        this.word = words.en[index];
        this.alphabet = alphabet.en
    } else {
        let index = Math.floor(Math.random() * words.ru.length);
        this.word = words.ru[index];
        this.alphabet = alphabet.ru
    }
};

export default Room;