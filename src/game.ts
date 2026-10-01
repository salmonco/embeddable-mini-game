import type Character from "./character.js";
import Hurdle from "./hurdle.js";

class Game {
    private root
    private character
    private hurdle

    constructor(root: HTMLDivElement, character: Character) {
        this.root = root
        this.character = character
        this.hurdle = new Hurdle(6)
    }

    init() {
        if (document.body.querySelector('#mini-game-root') === null) {
            this.root.id = 'mini-game-root'
            document.body.appendChild(this.root)
        }
        if (this.root.querySelector('#character') === null) {
            const characterContainer = document.createElement('div')
            characterContainer.id = 'character'
            this.root.appendChild(characterContainer)
        }
        if (this.root.querySelector('#hurdle') === null) {
            const hurdleContainer = document.createElement('div')
            hurdleContainer.id = 'hurdle'
            this.root.appendChild(hurdleContainer)
        }
    }

    render() {
        const characterContainer = this.root.querySelector<HTMLDivElement>('#character')
        if (characterContainer === null) {
            throw new Error('초기화해 주세요')
        }
        characterContainer.style.bottom = this.character.footHeight + 'px'

        const hurdleContainer = this.root.querySelector<HTMLDivElement>('#hurdle')
        if (hurdleContainer === null) {
            throw new Error('초기화해 주세요')
        }
        hurdleContainer.style.left = this.hurdle.x + 'px'
    }
}

export default Game
