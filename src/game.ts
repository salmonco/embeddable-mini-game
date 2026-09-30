import type Character from "./character.js";

class Game {
    private root
    private character

    constructor(root: HTMLDivElement, character: Character) {
        this.root = root
        this.character = character
    }

    render() {
        document.body.appendChild(this.root)
        const characterContainer = document.createElement('div')
        characterContainer.id = 'character'
        characterContainer.style.bottom = this.character.footHeight + 'px'
        this.root.appendChild(characterContainer)
    }
}

export default Game
