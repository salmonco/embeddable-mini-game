class Character {
    static JUMP_AFTER_MS = 2000
    static MAX_JUMP_COUNT = 2
    
    private _footHeight = 0
    private _jump_start_ms = 0
    private _jump_count = 0

    jump() {
        const jump_elapsed_ms = Date.now() - this._jump_start_ms
        if (jump_elapsed_ms <= Character.JUMP_AFTER_MS) {
            if (this._jump_count === Character.MAX_JUMP_COUNT) {
                return false
            }
        }
        this._jump_count += 1
        this._footHeight += 1
        if (this._jump_count === 1) {
            this._jump_start_ms = Date.now()
        }
        setTimeout(() => {
            this._jump_count -= 1
            this._footHeight -= 1
        }, Character.JUMP_AFTER_MS);
        return true
    }

    get footHeight() {
        return this._footHeight
    }
}

export default Character
