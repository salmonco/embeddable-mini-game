// @vitest-environment happy-dom
import { test, expect, afterEach } from 'vitest'
import * as miniGame from '../src/index.js'
import { createMiniGame } from '../src/index.js'

afterEach(() => {
    document.body.innerHTML = ''
})

function getHost(container: HTMLElement) {
    return container.querySelector('[data-mini-game]')
}

// 공개 API
test('패키지는 createMiniGame만 내보낸다', () => {
    expect(Object.keys(miniGame)).toEqual(['createMiniGame'])
})

// createMiniGame
test('createMiniGame을 부르면 따로 초기화하지 않아도 컨테이너에 게임이 그려진다', () => {
    const container = document.createElement('div')
    createMiniGame(container)
    expect(getHost(container)?.shadowRoot?.querySelector('#character')).not.toBeNull()
})

test('createMiniGame이 돌려준 destroy를 부르면 게임이 치워진다', () => {
    const container = document.createElement('div')
    const game = createMiniGame(container)
    game.destroy()
    expect(getHost(container)).toBeNull()
})

test('createMiniGame으로 띄운 게임은 시작 버튼으로 시작할 수 있다', () => {
    const container = document.createElement('div')
    const game = createMiniGame(container)
    getHost(container)?.shadowRoot?.querySelector<HTMLButtonElement>('#startButton')?.click()
    expect(getHost(container)?.shadowRoot?.querySelector('#jumpButton')).not.toBeNull()
    game.destroy()
})
