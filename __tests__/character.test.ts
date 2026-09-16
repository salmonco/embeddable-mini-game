import Character from '../src/character.js'
import { test, expect, vi } from 'vitest'
import Hurdle from '../src/hurdle.js'

test('캐릭터는 점프할 수 있다', () => {
    const character = new Character()
    expect(character.jump()).toBe(true)
})

test('캐릭터가 점프하면 캐릭터의 발 높이가 1 증가한다', () => {
    const character = new Character()
    character.jump()
    expect(character.footHeight).toBe(1)
    character.jump()
    expect(character.footHeight).toBe(2)
})

test('캐릭터가 점프한 후 몇 초 뒤에 발 높이가 1 감소한다', () => {
    vi.useFakeTimers()
    const character = new Character()
    character.jump()
    vi.advanceTimersByTime(Character.JUMP_AFTER_MS * 0.5)
    character.jump()
    expect(character.footHeight).toBe(2)
    vi.advanceTimersByTime(Character.JUMP_AFTER_MS * 0.5)
    expect(character.footHeight).toBe(1)
    vi.advanceTimersByTime(Character.JUMP_AFTER_MS * 0.5)
    expect(character.footHeight).toBe(0)
    vi.useRealTimers()
})

test('캐릭터는 처음 점프한 이후 몇 초 이내에 최대 1번 더 점프할 수 있다', () => {
    vi.useFakeTimers()
    const character = new Character()
    expect(character.jump()).toBe(true)
    expect(character.jump()).toBe(true)
    expect(character.jump()).toBe(false)
    vi.advanceTimersByTime(Character.JUMP_AFTER_MS)
    expect(character.jump()).toBe(true)
    vi.advanceTimersByTime(Character.JUMP_AFTER_MS * 0.5)
    expect(character.jump()).toBe(true)
    expect(character.jump()).toBe(false)
    vi.advanceTimersByTime(Character.JUMP_AFTER_MS * 0.5)
    expect(character.jump()).toBe(true)
    vi.useRealTimers()
})

test('캐릭터의 x 좌표의 초기값은 0이다', () => {
    const character = new Character()
    expect(character.x).toBe(0)
})

test('캐릭터의 x 좌표와 허들의 x 좌표가 같으면 만난다', () => {
    const character = new Character()
    const hurdle = new Hurdle(character.x)
    expect(character.isMeetHurdle(hurdle.x)).toBe(true)
})

test('캐릭터가 허들을 만났을 때 발 높이가 허들의 높이보다 낮으면 죽는다', () => {
    const character = new Character()
    const hurdle = new Hurdle(character.x)
    expect(character.isMeetHurdle(hurdle.x)).toBe(true)
    expect(character.footHeight < hurdle.height).toBe(true)
    expect(character.isSurvive(hurdle)).toBe(false)
})
