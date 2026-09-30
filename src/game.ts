import type Character from "./character.js";

class Game {
    private root
    private character

    constructor(root: HTMLDivElement, character: Character) {
        this.root = root
        this.character = character
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
    }

    render() {
        const characterContainer = this.root.querySelector<HTMLDivElement>('#character')
        if (characterContainer === null) {
            throw new Error('초기화해 주세요')
        }
        characterContainer.style.bottom = this.character.footHeight + 'px'
        
    }
}

export default Game
