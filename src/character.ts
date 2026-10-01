import type Hurdle from "./hurdle.js"

class Character {
    static JUMP_AFTER_MS = 2000
    static MAX_JUMP_COUNT = 2
    static JUMP_HEIGHT = 200

    private _footHeight = 0
    private _jump_start_ms = 0
    private _jump_count = 0
    private _x = 0

    jump() {
        const jump_elapsed_ms = Date.now() - this._jump_start_ms
        if (jump_elapsed_ms <= Character.JUMP_AFTER_MS) {
            if (this._jump_count === Character.MAX_JUMP_COUNT) {
                return false
            }
        }
        this._jump_count += 1
        this._footHeight += Character.JUMP_HEIGHT
        if (this._jump_count === 1) {
            this._jump_start_ms = Date.now()
        }
        setTimeout(() => {
            this._jump_count -= 1
            this._footHeight -= Character.JUMP_HEIGHT
        }, Character.JUMP_AFTER_MS);
        return true
    }

    isMeetHurdle(hurdleX: number) {
        return this._x === hurdleX
    }

    isSurvive(hurdle: Hurdle) {
        if (!this.isMeetHurdle(hurdle.x)) {
            return true
        }
        if (this._footHeight < hurdle.height) {
            return false
        }
        return true
    }

    get footHeight() {
        return this._footHeight
    }

    get x() {
        return this._x
    }
}

export default Character
