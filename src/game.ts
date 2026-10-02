import type Character from "./character.js";
import Hurdle from "./hurdle.js";

class Game {
    private _root
    private _character
    private _hurdle
    private _requestAnimationFrameId: number | null

    constructor(root: HTMLDivElement, character: Character) {
        this._root = root
        this._character = character
        this._hurdle = new Hurdle(300)
        this._requestAnimationFrameId = null
    }

    init() {
        if (document.body.querySelector('#mini-game-root') === null) {
            this._root.id = 'mini-game-root'
            document.body.appendChild(this._root)
        }
        if (this._root.querySelector('#character') === null) {
            const characterContainer = document.createElement('div')
            characterContainer.id = 'character'
            this._root.appendChild(characterContainer)
        }
        if (this._root.querySelector('#hurdle') === null) {
            const hurdleContainer = document.createElement('div')
            hurdleContainer.id = 'hurdle'
            this._root.appendChild(hurdleContainer)
        }
        if (this._root.querySelector('#jumpButton') === null) {
            const jumpButton = document.createElement('button')
            jumpButton.id = 'jumpButton'
            jumpButton.innerText = 'JUMP!'
            jumpButton.addEventListener('click', () => this._character.jump())
            this._root.appendChild(jumpButton)
        }
        if (this._root.querySelector('#startButton') === null) {
            const startButton = document.createElement('button')
            startButton.id = 'startButton'
            startButton.innerText = 'START!'
            startButton.addEventListener('click', () => this.start())
            this._root.appendChild(startButton)
        }
    }

    render() {
        const characterContainer = this._root.querySelector<HTMLDivElement>('#character')
        if (characterContainer === null) {
            throw new Error('초기화해 주세요')
        }
        characterContainer.style.bottom = this._character.footHeight + 'px'

        const hurdleContainer = this._root.querySelector<HTMLDivElement>('#hurdle')
        if (hurdleContainer === null) {
            throw new Error('초기화해 주세요')
        }
        hurdleContainer.style.left = this._hurdle.x + 'px'
    }

    start() {
        let lastTime: number | null = null

        const loop = (now: number) => {
            const delta = lastTime === null ? 0 : now - lastTime
            lastTime = now

            this._hurdle.tick(delta)
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
