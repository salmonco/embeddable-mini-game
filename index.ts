import Character from "./src/character.js";
import Game from "./src/game.js";
import Hurdle from "./src/hurdle.js";

const root = document.createElement('div')
const character = new Character()
const hurdles = [new Hurdle(300), new Hurdle(550), new Hurdle(800), new Hurdle(1500), new Hurdle(1550)]
const game = new Game(root, character, hurdles)
game.init()
