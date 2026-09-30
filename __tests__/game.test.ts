// @vitest-environment happy-dom
import { test, expect, afterEach } from 'vitest'
import Character from '../src/character.js'
import Game from '../src/game.js';

afterEach(() => {
    document.body.innerHTML = ''
})

test('게임 화면에 캐릭터가 표시된다', () => {
    const root = document.createElement('div')
    const character = new Character()
    const game = new Game(root, character)
    game.render()
    expect(root.querySelector<HTMLDivElement>('#character')).not.toBeNull()
})

test('캐릭터가 점프하면 발이 올라가 보인다', () => {
    const root = document.createElement('div')
    const character = new Character()
    const game = new Game(root, character)
    character.jump()
    game.render()
    expect(root.querySelector<HTMLDivElement>('#character')?.style.bottom).toBe('1px')
})
