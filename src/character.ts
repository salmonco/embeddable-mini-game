import Hurdle from "./hurdle.js"

class Character {
    static MAX_JUMP_COUNT = 2
    static JUMP_HEIGHT = 200
    static JUMP_DURATION_MS = 1000
    static WIDTH = 100
    static HEIGHT = 150

    /**
     * 점프 높이와 체공 시간으로 초기 속도와 중력을 정한다
     * JUMP_DURATION_MS / 2 에 JUMP_HEIGHT 에 도달하고, JUMP_DURATION_MS 에 착지한다
     *
     * 꼭대기까지 걸리는 시간 t_h = T / 2 일 때 v0 = 2H / t_h, g = 2H / t_h²
     * → v0 = 4H / T, g = 8H / T²
     * 출처: GDC 2016 "Math for Game Programmers: Building a Better Jump" (Kyle Pittman)
     *       https://www.youtube.com/watch?v=hG9SzQxaCm8
     *       https://en.wikipedia.org/wiki/Projectile_motion#Maximum_height_of_projectile
     */
    static JUMP_VELOCITY = 4 * Character.JUMP_HEIGHT / Character.JUMP_DURATION_MS
    static GRAVITY = 8 * Character.JUMP_HEIGHT / Character.JUMP_DURATION_MS ** 2

    // 부동소수점 오차로 땅 바로 위에 남는 것을 착지로 본다
    private static GROUND_EPSILON = 1e-6

    private _footHeight = 0
    private _velocity = 0
    private _jumpCount = 0
    private _x = 0

    jump() {
        if (this._jumpCount === Character.MAX_JUMP_COUNT) {
            return false
        }
        this._jumpCount += 1
        this._velocity = Character.JUMP_VELOCITY
        return true
    }

    reset() {
        this._footHeight = 0
        this._velocity = 0
        this._jumpCount = 0
    }

    tick(delta: number) {
        if (this._jumpCount === 0) {
            return
        }
        // 등가속도 운동 공식(s = v0·t - ½·g·t², v = v0 - g·t)을 그대로 써서 delta 를 어떻게 나눠도 같은 위치가 된다
        // 출처: https://ko.wikipedia.org/wiki/등가속도_운동
        //       https://en.wikipedia.org/wiki/Equations_of_motion#Constant_translational_acceleration_in_a_straight_line
        this._footHeight += this._velocity * delta - 0.5 * Character.GRAVITY * delta ** 2
        this._velocity -= Character.GRAVITY * delta
        if (this._velocity <= 0 && this._footHeight <= Character.GROUND_EPSILON) {
            this._footHeight = 0
            this._velocity = 0
            this._jumpCount = 0
        }
    }

    isMeetHurdle(hurdleX: number) {
        return hurdleX < this._x + Character.WIDTH && hurdleX + Hurdle.WIDTH > this._x
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
