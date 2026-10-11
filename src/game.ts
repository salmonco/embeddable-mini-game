import Character from "./character.js";
import Hurdle from "./hurdle.js";

class Game {
    private _root: HTMLDivElement
    private _character: Character
    private _hurdles: Hurdle[]
    private _requestAnimationFrameId: number | null = null
    private _isPaused: boolean = false
    private _lastTime: number | null = null

    constructor(root: HTMLDivElement, character: Character, hurdles: Hurdle[] = [new Hurdle(300)]) {
        this._root = root
        this._character = character
        this._hurdles = hurdles
    }

    init() {
        this._createRoot()
        this._createCharacter()
        this._createHurdle()
        this._createStartButton()
        this._createCharacterImageInput()
        this._createHurdleImageInput()
        this.render()
    }

    render() {
        const characterContainer = this._root.querySelector<HTMLDivElement>('#character')
        const hurdleContainer = this._root.querySelector<HTMLDivElement>('#hurdle')
        const hurdleItems = this._root.querySelectorAll<HTMLDivElement>('.hurdleItem')
        if (characterContainer === null || hurdleContainer === null) {
            throw new Error('초기화해 주세요')
        }
        characterContainer.style.bottom = this._character.footHeight + 'px'
        for (let i = 0; i < this._hurdles.length; i++) {
            const hurdle = this._hurdles[i]
            const hurdleItem = hurdleItems[i]
            if (hurdle && hurdleItem) {
                hurdleItem.style.left = hurdle.x + 'px'
            }
        }
    }

    start() {
        for (const hurdle of this._hurdles) {
            hurdle.reset()
        }
        this._character.reset()
        this._lastTime = null
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
        this._lastTime = null
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
        for (const hurdle of this._hurdles) {
            hurdle.tick(delta)
        }
        this._character.tick(delta)
        this.render()
        for (const hurdle of this._hurdles) {
            if (!this._character.isSurvive(hurdle)) {
                this._gameOver()
                return
            }
        }
        this._requestAnimationFrameId = requestAnimationFrame(this._animate)
    }

    private _gameOver() {
        this._hideStopButton()
        this._hidePauseButton()
        this._hideResumeButton()
        this._showStartButton()
        this._createGameOverMessage()
        this._showGameOverMessage()
        this.stop()
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
            characterContainer.style.width = Character.WIDTH + 'px'
            characterContainer.style.height = Character.HEIGHT + 'px'
            this._root.appendChild(characterContainer)
        }
    }

    private _createHurdle() {
        if (this._root.querySelector('#hurdle') === null) {
            const hurdleContainer = document.createElement('div')
            hurdleContainer.id = 'hurdle'
            this._root.appendChild(hurdleContainer)
            for (const _hurdle of this._hurdles) {
                const hurdleItem = document.createElement('div')
                hurdleItem.className = 'hurdleItem'
                hurdleItem.style.width = Hurdle.WIDTH + 'px'
                hurdleItem.style.height = Hurdle.HEIGHT + 'px'
                hurdleContainer.appendChild(hurdleItem)
            }
        }
    }

    private _createStartButton() {
        if (this._root.querySelector('#startButton') === null) {
            const startButton = document.createElement('button')
            startButton.id = 'startButton'
            startButton.innerText = 'START!'
            startButton.addEventListener('click', () => {
                this._hideStartButton()
                this._hideGameOverMessage()
                this._createJumpButton()
                this._createStopButton()
                this._createPauseButton()
                this._showStopButton()
                this._showPauseButton()
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

    private _showStartButton() {
        const startButton = this._root.querySelector<HTMLButtonElement>('#startButton')
        if (startButton !== null) {
            startButton.style.display = 'block'
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
                this._hideStopButton()
                this._hidePauseButton()
                this._hideResumeButton()
                this._showStartButton()
                this.stop()
            })
            this._root.appendChild(stopButton)
        }
    }

    private _hideStopButton() {
        const stopButton = this._root.querySelector<HTMLButtonElement>('#stopButton')
        if (stopButton !== null) {
            stopButton.style.display = 'none'
        }
    }

    private _showStopButton() {
        const stopButton = this._root.querySelector<HTMLButtonElement>('#stopButton')
        if (stopButton !== null) {
            stopButton.style.display = 'block'
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

    private _createGameOverMessage() {
        if (this._root.querySelector('#gameOverMessage') === null) {
            const gameOverMessage = document.createElement('div')
            gameOverMessage.id = 'gameOverMessage'
            gameOverMessage.innerText = 'GAME OVER'
            this._root.appendChild(gameOverMessage)
        }
    }

    private _hideGameOverMessage() {
        const gameOverMessage = this._root.querySelector<HTMLDivElement>('#gameOverMessage')
        if (gameOverMessage !== null) {
            gameOverMessage.style.display = 'none'
        }
    }

    private _showGameOverMessage() {
        const gameOverMessage = this._root.querySelector<HTMLDivElement>('#gameOverMessage')
        if (gameOverMessage !== null) {
            gameOverMessage.style.display = 'block'
        }
    }

    private _createCharacterImageInput() {
        if (this._root.querySelector('#characterImageInput') === null) {
            const characterImageInput = document.createElement('input')
            characterImageInput.id = 'characterImageInput'
            characterImageInput.type = 'file'
            characterImageInput.accept = 'image/*'
            characterImageInput.addEventListener('change', (e) => {
                const files = (e.target as HTMLInputElement).files
                if (files === null || !files[0]) {
                    return
                }
                const characterContainer = this._root.querySelector<HTMLDivElement>('#character')
                if (characterContainer === null) {
                    return
                }
                characterContainer.style.backgroundImage = `url("${URL.createObjectURL(files[0])}")`
            })
            this._root.appendChild(characterImageInput)
        }
    }

    private _createHurdleImageInput() {
        if (this._root.querySelector('#hurdleImageInput') === null) {
            const hurdleImageInput = document.createElement('input')
            hurdleImageInput.id = 'hurdleImageInput'
            hurdleImageInput.type = 'file'
            hurdleImageInput.accept = 'image/*'
            hurdleImageInput.addEventListener('change', (e) => {
                const files = (e.target as HTMLInputElement).files
                if (files === null || !files[0]) {
                    return
                }
                const hurdleItems = this._root.querySelectorAll<HTMLDivElement>('.hurdleItem')
                for (const hurdle of hurdleItems) {
                    hurdle.style.backgroundImage = `url("${URL.createObjectURL(files[0])}")`
                }
            })
            this._root.appendChild(hurdleImageInput)
        }
    }
}

export default Game
