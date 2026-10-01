import Character from "./src/character.js";
import Game from "./src/game.js";

const root = document.createElement('div')
const character = new Character()
const game = new Game(root, character)
game.init()
game.start()
