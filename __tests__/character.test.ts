import Character from '../src/character.js'
import { test, expect, vi } from 'vitest'

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
