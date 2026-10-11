import Character from '../src/character.js'
import { test, expect, vi } from 'vitest'
import Hurdle from '../src/hurdle.js'

// 점프
test('캐릭터는 점프할 수 있다', () => {
    const character = new Character()
    expect(character.jump()).toBe(true)
})

test('점프 직후에는 발 높이가 아직 0이다', () => {
    const character = new Character()
    character.jump()
    expect(character.footHeight).toBe(0)
})

test('점프하면 발 높이가 시간에 따라 서서히 올라간다', () => {
    const character = new Character()
    character.jump()
    character.tick(Character.JUMP_DURATION_MS / 4)
    expect(character.footHeight).toBeGreaterThan(0)
    expect(character.footHeight).toBeLessThan(Character.JUMP_HEIGHT)
})

test('점프 시간의 절반이 지나면 점프 높이에 도달한다', () => {
    const character = new Character()
    character.jump()
    character.tick(Character.JUMP_DURATION_MS / 2)
    expect(character.footHeight).toBeCloseTo(Character.JUMP_HEIGHT)
})

test('점프 높이에 도달한 뒤에는 서서히 내려온다', () => {
    const character = new Character()
    character.jump()
    character.tick(Character.JUMP_DURATION_MS / 2)
    character.tick(Character.JUMP_DURATION_MS / 4)
    expect(character.footHeight).toBeGreaterThan(0)
    expect(character.footHeight).toBeLessThan(Character.JUMP_HEIGHT)
})

test('점프 시간이 지나면 착지해서 발 높이가 0이 되고 땅 아래로 내려가지 않는다', () => {
    const character = new Character()
    character.jump()
    character.tick(Character.JUMP_DURATION_MS)
    expect(character.footHeight).toBe(0)
    character.tick(Character.JUMP_DURATION_MS)
    expect(character.footHeight).toBe(0)
})

test('시간을 프레임 단위로 잘게 나눠 흘려도 같은 높이에 도달한다', () => {
    const character = new Character()
    character.jump()
    const frames = 50
    for (let i = 0; i < frames; i++) {
        character.tick(Character.JUMP_DURATION_MS / 2 / frames)
    }
    expect(character.footHeight).toBeCloseTo(Character.JUMP_HEIGHT)
})

test('공중에서 한 번 더 점프하면 그 높이에서 다시 점프 높이만큼 올라간다', () => {
    const character = new Character()
    character.jump()
    character.tick(Character.JUMP_DURATION_MS / 2)
    character.jump()
    character.tick(Character.JUMP_DURATION_MS / 2)
    expect(character.footHeight).toBeCloseTo(Character.JUMP_HEIGHT * 2)
})

test('착지하기 전까지는 최대 점프 횟수만큼만 점프할 수 있다', () => {
    const character = new Character()
    for (let i = 0; i < Character.MAX_JUMP_COUNT; i++) {
        expect(character.jump()).toBe(true)
    }
    expect(character.jump()).toBe(false)
})

test('착지하면 다시 점프할 수 있다', () => {
    const character = new Character()
    for (let i = 0; i < Character.MAX_JUMP_COUNT; i++) {
        character.jump()
    }
    character.tick(Character.JUMP_DURATION_MS * Character.MAX_JUMP_COUNT)
    expect(character.footHeight).toBe(0)
    expect(character.jump()).toBe(true)
})

test('게임 시간이 흐르지 않으면 실제 시간이 지나도 발 높이가 변하지 않는다', () => {
    vi.useFakeTimers()
    const character = new Character()
    character.jump()
    character.tick(Character.JUMP_DURATION_MS / 4)
    const footHeight = character.footHeight
    vi.advanceTimersByTime(Character.JUMP_DURATION_MS * 10)
    expect(character.footHeight).toBe(footHeight)
    vi.useRealTimers()
})

test('캐릭터를 초기화하면 땅에 서 있고 다시 최대 점프 횟수만큼 점프할 수 있다', () => {
    const character = new Character()
    for (let i = 0; i < Character.MAX_JUMP_COUNT; i++) {
        character.jump()
    }
    character.tick(Character.JUMP_DURATION_MS / 4)
    character.reset()
    expect(character.footHeight).toBe(0)
    character.tick(Character.JUMP_DURATION_MS / 4)
    expect(character.footHeight).toBe(0)
    for (let i = 0; i < Character.MAX_JUMP_COUNT; i++) {
        expect(character.jump()).toBe(true)
    }
})

// 허들
test('캐릭터의 x 좌표의 초기값은 0이다', () => {
    const character = new Character()
    expect(character.x).toBe(0)
})

test('캐릭터의 x 좌표와 허들의 x 좌표가 같으면 만난다', () => {
    const character = new Character()
    const hurdle = new Hurdle(character.x)
    expect(character.isMeetHurdle(hurdle.x)).toBe(true)
})

test('허들이 캐릭터와 일부 겹치면 만난다', () => {
    const character = new Character()
    const hurdle = new Hurdle(character.x + Character.WIDTH / 2)
    expect(character.isMeetHurdle(hurdle.x)).toBe(true)
})

test('허들이 캐릭터의 왼쪽 끝을 지나쳤어도 아직 겹쳐 있으면 만난다', () => {
    const character = new Character()
    const hurdle = new Hurdle(character.x - Hurdle.WIDTH / 2)
    expect(character.isMeetHurdle(hurdle.x)).toBe(true)
})

test('허들이 캐릭터의 오른쪽 끝보다 오른쪽에 있으면 만나지 않는다', () => {
    const character = new Character()
    const hurdle = new Hurdle(character.x + Character.WIDTH)
    expect(character.isMeetHurdle(hurdle.x)).toBe(false)
})

test('허들이 캐릭터의 왼쪽으로 완전히 지나가면 만나지 않는다', () => {
    const character = new Character()
    const hurdle = new Hurdle(character.x - Hurdle.WIDTH)
    expect(character.isMeetHurdle(hurdle.x)).toBe(false)
})

test('캐릭터가 허들을 만났을 때 발 높이가 허들의 높이보다 낮으면 죽는다', () => {
    const character = new Character()
    const hurdle = new Hurdle(character.x)
    expect(character.isMeetHurdle(hurdle.x)).toBe(true)
    expect(character.footHeight < hurdle.height).toBe(true)
    expect(character.isSurvive(hurdle)).toBe(false)
})

test('점프 직후 허들과 겹치면 발이 아직 낮아서 죽는다', () => {
    const character = new Character()
    const hurdle = new Hurdle(character.x)
    character.jump()
    expect(character.isSurvive(hurdle)).toBe(false)
})

test('점프해서 충분히 올라간 뒤 허들과 겹치면 산다', () => {
    const character = new Character()
    const hurdle = new Hurdle(character.x)
    character.jump()
    character.tick(Character.JUMP_DURATION_MS / 2)
    expect(character.isSurvive(hurdle)).toBe(true)
})

test('같은 발 높이라도 허들이 발보다 낮으면 살고, 높으면 죽는다', () => {
    const character = new Character()
    character.jump()
    character.tick(50)
    const footHeight = character.footHeight
    expect(character.isSurvive(new Hurdle(character.x, footHeight - 1))).toBe(true)
    expect(character.isSurvive(new Hurdle(character.x, footHeight + 1))).toBe(false)
})

test('점프 높이보다 높은 허들은 점프 꼭대기에서도 넘을 수 없다', () => {
    const character = new Character()
    const hurdle = new Hurdle(character.x, Character.JUMP_HEIGHT + 1)
    character.jump()
    character.tick(Character.JUMP_DURATION_MS / 2)
    expect(character.isSurvive(hurdle)).toBe(false)
})
