import Character from "./character.js";
import Game from "./game.js";
import Hurdle from "./hurdle.js";

export interface MiniGame {
    /** 게임을 멈추고 컨테이너에서 제거합니다 */
    destroy(): void
}

/**
 * - 컨테이너 안에 미니게임을 띄웁니다
 * - 로딩이 끝나면 destroy를 불러 게임을 제거합니다
 *
 * @param container 게임이 들어갈 요소
 *
 * @example
 * ```ts
 * const game = createMiniGame(document.querySelector('#loading-modal')!)
 * try {
 *     const data = await fetchData()
 *     // ...
 * } finally {
 *     game.destroy()
 * }
 * ```
 */
export function createMiniGame(container: HTMLElement): MiniGame {
    const character = new Character()
    const hurdles = [new Hurdle(300), new Hurdle(550), new Hurdle(800), new Hurdle(1500), new Hurdle(1550)]
    const game = new Game(container, character, hurdles)
    game.init()
    return {
        destroy: () => game.destroy(),
    }
}
