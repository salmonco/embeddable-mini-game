import type Character from "./character.js";
import Hurdle from "./hurdle.js";

class Game {
    private _root: HTMLDivElement
    private _character: Character
    private _hurdle: Hurdle = new Hurdle(300)
    private _requestAnimationFrameId: number | null = null
    private _isPaused: boolean = false
    private _lastTime: number | null = null

    constructor(root: HTMLDivElement, character: Character) {
        this._root = root
        this._character = character
    }

    init() {
        this._createRoot()
        this._createCharacter()
        this._createHurdle()
        this._createStartButton()
    }

    render() {
        const characterContainer = this._root.querySelector<HTMLDivElement>('#character')
        const hurdleContainer = this._root.querySelector<HTMLDivElement>('#hurdle')
        if (characterContainer === null || hurdleContainer === null) {
            throw new Error('초기화해 주세요')
        }
        characterContainer.style.bottom = this._character.footHeight + 'px'
        hurdleContainer.style.left = this._hurdle.x + 'px'
    }

    start() {
        this._requestAnimationFrameId = requestAnimationFrame(this._animate)
    }

    stop() {
        if (this.requestAnimationFrameId === null) {
            return
        }
        cancelAnimationFrame(this.requestAnimationFrameId)
        this._requestAnimationFrameId = null
    }

    pause() {
        if (this.requestAnimationFrameId === null) {
            return
        }
        cancelAnimationFrame(this.requestAnimationFrameId)
        this._isPaused = true
    }

    resume() {
        if (this.requestAnimationFrameId === null) {
            return
        }
        this._requestAnimationFrameId = requestAnimationFrame(this._animate)
        this._isPaused = false
    }

    get requestAnimationFrameId() {
        return this._requestAnimationFrameId
    }

    get isPaused() {
        return this._isPaused
    }

    /**
     * requestAnimationFrame의 콜백 함수로 넘길 때
     * this를 Game으로 바인딩하기 위해 화살표 함수 이용
     */
    private _animate = (now: number) => {
        const delta = this._lastTime === null ? 0 : now - this._lastTime
        this._lastTime = now
        this._hurdle.tick(delta)
        this.render()
        this._requestAnimationFrameId = requestAnimationFrame(this._animate)
    }

    private _createRoot() {
        if (document.body.querySelector('#mini-game-root') === null) {
            this._root.id = 'mini-game-root'
            document.body.appendChild(this._root)
        }
    }

    private _createCharacter() {
        if (this._root.querySelector('#character') === null) {
            const characterContainer = document.createElement('div')
            characterContainer.id = 'character'
            this._root.appendChild(characterContainer)
        }
    }

    private _createHurdle() {
        if (this._root.querySelector('#hurdle') === null) {
            const hurdleContainer = document.createElement('div')
            hurdleContainer.id = 'hurdle'
            this._root.appendChild(hurdleContainer)
        }
    }

    private _createStartButton() {
        if (this._root.querySelector('#startButton') === null) {
            const startButton = document.createElement('button')
            startButton.id = 'startButton'
            startButton.innerText = 'START!'
            startButton.addEventListener('click', () => {
                this._hideStartButton()
                this._createJumpButton()
                this._createStopButton()
                this._createPauseButton()
                this.start()
            })
            this._root.appendChild(startButton)
        }
    }

    private _hideStartButton() {
        const startButton = this._root.querySelector<HTMLButtonElement>('#startButton')
        if (startButton !== null) {
            startButton.style.display = 'none'
        }
    }

    private _createJumpButton() {
        if (this._root.querySelector('#jumpButton') === null) {
            const jumpButton = document.createElement('button')
            jumpButton.id = 'jumpButton'
            jumpButton.innerText = 'JUMP!'
            jumpButton.addEventListener('click', () => this._character.jump())
            this._root.appendChild(jumpButton)
        }
    }

    private _createStopButton() {
        if (this._root.querySelector('#stopButton') === null) {
            const stopButton = document.createElement('button')
            stopButton.id = 'stopButton'
            stopButton.innerText = 'STOP'
            stopButton.addEventListener('click', () => {
                this.stop()
            })
            this._root.appendChild(stopButton)
        }
    }

    private _createPauseButton() {
        if (this._root.querySelector('#pauseButton') === null) {
            const pauseButton = document.createElement('button')
            pauseButton.id = 'pauseButton'
            pauseButton.innerText = 'PAUSE'
            pauseButton.addEventListener('click', () => {
                this._hidePauseButton()
                this._createResumeButton()
                this._showResumeButton()
                this.pause()
            })
            this._root.appendChild(pauseButton)
        }
    }

    private _hidePauseButton() {
        const pauseButton = this._root.querySelector<HTMLButtonElement>('#pauseButton')
        if (pauseButton !== null) {
            pauseButton.style.display = 'none'
        }
    }

    private _showPauseButton() {
        const pauseButton = this._root.querySelector<HTMLButtonElement>('#pauseButton')
        if (pauseButton !== null) {
            pauseButton.style.display = 'block'
        }
    }

    private _createResumeButton() {
        if (this._root.querySelector('#resumeButton') === null) {
            const resumeButton = document.createElement('button')
            resumeButton.id = 'resumeButton'
            resumeButton.innerText = 'RESUME'
            resumeButton.addEventListener('click', () => {
                this._hideResumeButton()
                this._showPauseButton()
                this.resume()
            })
            this._root.appendChild(resumeButton)
        }
    }

    private _hideResumeButton() {
        const resumeButton = this._root.querySelector<HTMLButtonElement>('#resumeButton')
        if (resumeButton !== null) {
            resumeButton.style.display = 'none'
        }
    }

    private _showResumeButton() {
        const resumeButton = this._root.querySelector<HTMLButtonElement>('#resumeButton')
        if (resumeButton !== null) {
            resumeButton.style.display = 'block'
        }
    }
}

export default Game
