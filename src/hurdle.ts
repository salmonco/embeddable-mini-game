class Hurdle {
    static SPEED = 0.01

    private _height = 1
    private _x

    constructor(x: number) {
        this._x = x
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
