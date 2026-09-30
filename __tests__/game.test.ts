// @vitest-environment happy-dom
import { test, expect, afterEach } from 'vitest'
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
    expect(root.querySelector<HTMLDivElement>('#character')?.style.bottom).toBe('1px')
    character.jump()
    game.render()
    expect(root.querySelector<HTMLDivElement>('#character')?.style.bottom).toBe('2px')
})
