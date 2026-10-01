// @vitest-environment happy-dom
import { test, expect, afterEach, vi } from 'vitest'
import Character from '../src/character.js'
import Game from '../src/game.js';

afterEach(() => {
    document.body.innerHTML = ''
})

test('게임이 초기화되면 document body에 루트 DOM이 붙는다', () => {
    const root = document.createElement('div')
    const character = new Character()
    const game = new Game(root, character)
    game.init()
    expect(document.body.querySelector<HTMLDivElement>('#mini-game-root')).not.toBeNull()
})

test('게임이 초기화되면 화면에 캐릭터가 표시된다', () => {
    const root = document.createElement('div')
    const character = new Character()
    const game = new Game(root, character)
    game.init()
    expect(root.querySelector<HTMLDivElement>('#character')).not.toBeNull()
})

test('초기화하기 전에 렌더하면 에러를 던진다', () => {
    const root = document.createElement('div')
    const character = new Character()
    const game = new Game(root, character)
    expect(() => game.render()).toThrow(new Error('초기화해 주세요'))
})

test('캐릭터가 점프하면 발이 올라가 보인다', () => {
    const root = document.createElement('div')
    const character = new Character()
    const game = new Game(root, character)
    game.init()
    character.jump()
    game.render()
    expect(root.querySelector<HTMLDivElement>('#character')?.style.bottom).toBe(Character.JUMP_HEIGHT + 'px')
    character.jump()
    game.render()
    expect(root.querySelector<HTMLDivElement>('#character')?.style.bottom).toBe(Character.JUMP_HEIGHT * 2 + 'px')
})

test('게임이 초기화되면 화면에 허들이 표시된다', () => {
    const root = document.createElement('div')
    const character = new Character()
    const game = new Game(root, character)
    game.init()
    expect(root.querySelector<HTMLDivElement>('#hurdle')).not.toBeNull()
})

test('시간이 지날수록 허들이 왼쪽으로 이동되어 보인다', () => {
    vi.useFakeTimers()
    const root = document.createElement('div')
    const character = new Character()
    const game = new Game(root, character)
    game.init()
    game.start()
    vi.advanceTimersToNextFrame()
    const beforeLeft = parseFloat(root.querySelector<HTMLDivElement>('#hurdle')?.style.left ?? '0')
    vi.advanceTimersToNextFrame()
    const afterLeft = parseFloat(root.querySelector<HTMLDivElement>('#hurdle')?.style.left ?? '0')
    expect(afterLeft).toBeLessThan(beforeLeft)
    game.stop()
    vi.useRealTimers()
})

test('게임이 초기화되면 화면에 점프 버튼이 표시된다', () => {
    const root = document.createElement('div')
    const character = new Character()
    const game = new Game(root, character)
    game.init()
    expect(root.querySelector<HTMLDivElement>('#jumpButton')).not.toBeNull()
})

test('점프 버튼을 누르면 캐릭터가 점프한다', () => {
    const root = document.createElement('div')
    const character = new Character()
    const game = new Game(root, character)
    game.init()
    const jumpButton = document.querySelector<HTMLButtonElement>('#jumpButton')
    jumpButton?.click()
    game.render()
    expect(root.querySelector<HTMLDivElement>('#character')?.style.bottom).toBe(Character.JUMP_HEIGHT + 'px')
    jumpButton?.click()
    game.render()
    expect(root.querySelector<HTMLDivElement>('#character')?.style.bottom).toBe(Character.JUMP_HEIGHT * 2 + 'px')
})
