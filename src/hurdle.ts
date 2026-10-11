class Hurdle {
    static SPEED = 0.15
    static WIDTH = 50
    static HEIGHT = 50

    private _height
    private _initialX
    private _x

    constructor(x: number, height: number = Hurdle.HEIGHT) {
        this._initialX = x
        this._x = x
        this._height = height
    }

    reset() {
        this._x = this._initialX
    }

    resize(height: number) {
        this._height = height
    }

    tick(delta: number) {
        this._x -= delta * Hurdle.SPEED
    }

    get height() {
        return this._height
    }

    get x() {
        return this._x
    }
}

export default Hurdle
