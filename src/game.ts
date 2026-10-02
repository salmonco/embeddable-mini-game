import type Character from "./character.js";
import Hurdle from "./hurdle.js";

class Game {
    private root
    private character
    private hurdle
    private _requestAnimationFrameId: number | null

    constructor(root: HTMLDivElement, character: Character) {
        this.root = root
        this.character = character
        this.hurdle = new Hurdle(300)
        this._requestAnimationFrameId = null
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
        if (this.root.querySelector('#jumpButton') === null) {
            const jumpButton = document.createElement('button')
            jumpButton.id = 'jumpButton'
            jumpButton.innerText = 'JUMP!'
            jumpButton.addEventListener('click', () => this.character.jump())
            this.root.appendChild(jumpButton)
        }
        if (this.root.querySelector('#startButton') === null) {
            const startButton = document.createElement('button')
            startButton.id = 'startButton'
            startButton.addEventListener('click', () => this.start())
            this.root.appendChild(startButton)
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

    start() {
        let lastTime: number | null = null

        const loop = (now: number) => {
            const delta = lastTime === null ? 0 : now - lastTime
            lastTime = now

            this.hurdle.tick(delta)
            this.render()
            this._requestAnimationFrameId = requestAnimationFrame(loop)
        }
        this._requestAnimationFrameId = requestAnimationFrame(loop)
    }

    stop() {
        if (this.requestAnimationFrameId === null) {
            return
        }
        cancelAnimationFrame(this.requestAnimationFrameId)
        this._requestAnimationFrameId = null
    }

    get requestAnimationFrameId() {
        return this._requestAnimationFrameId
    }
}

export default Game
