import { test, expect } from 'vitest'
import Hurdle from '../src/hurdle.js'

test('허들의 기본 높이는 1이다', () => {
    const hurdle = new Hurdle(4)
    expect(hurdle.height).toBe(1)
})

test('허들은 생성될 때 x 좌표가 결정된다', () => {
    const hurdle = new Hurdle(6)
    expect(hurdle.x).toBe(6)
})

test('허들은 시간이 지날 때마다 일정한 속도로 왼쪽으로 이동한다', () => {
    const hurdle = new Hurdle(6)
    expect(hurdle.x).toBe(6)
    const elapsed_ms = 1000
    const distance = elapsed_ms * Hurdle.SPEED
    hurdle.tick(elapsed_ms)
    expect(hurdle.x).toBe(6 - distance)
})
