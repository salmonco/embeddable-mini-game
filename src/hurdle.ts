class Hurdle {
    static SPEED = 0.001

    private _height = 1
    private _x

    constructor(x: number) {
        this._x = x
        this._process()
    }

    private _process() {
        setInterval(() => {
            this._x -= 1000 * Hurdle.SPEED
        }, 1000);
    }

    get height() {
        return this._height
    }

    get x() {
        return this._x
    }
}

export default Hurdle
