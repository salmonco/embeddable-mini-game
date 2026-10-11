# embeddable-mini-game

A small jump game you can drop into your page while users wait for a long load.

- One function call shows the game inside any element; one more removes it when loading is done
- Rendered inside Shadow DOM, so it never clashes with your page's CSS or ids
- CSS is bundled into the JS, so there's no stylesheet to import
- No dependencies, about 3KB gzipped

## Install

```bash
npm install embeddable-mini-game
# or
pnpm add embeddable-mini-game
```

## Usage

### Basic

```ts
import { createMiniGame } from 'embeddable-mini-game'

const game = createMiniGame(document.querySelector('#loading-modal')!)
try {
    const data = await fetchData()
    // ...
} finally {
    // Remove the game in finally so it doesn't stay on screen if loading fails
    game.destroy()
}
```

### React

```tsx
import { useEffect, useRef } from 'react'
import { createMiniGame } from 'embeddable-mini-game'

function LoadingGame() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const game = createMiniGame(containerRef.current!)
        return () => game.destroy()
    }, [])

    return <div ref={containerRef} />
}

// Render it only while loading; the game is removed when the component unmounts
{isLoading && <LoadingGame />}
```

### Script tag (no bundler)

```html
<div id="loading"></div>

<script src="https://cdn.jsdelivr.net/npm/embeddable-mini-game@1.0.0"></script>
<script>
    const game = MiniGame.createMiniGame(document.querySelector('#loading'))
    // When loading is done
    game.destroy()
</script>
```

## API

### `createMiniGame(container: HTMLElement): MiniGame`

Shows the game inside `container` and returns an object for removing it.

- The game is appended as a child of `container`. Anything already inside `container` stays as it is
- You can show several games on one page; they don't affect each other

### `MiniGame.destroy(): void`

Stops the game and removes it from `container`.

- Stops the running animation and frees the memory used by uploaded images
- Does not remove `container` itself
- Safe to call more than once

## How to play

| Button | Action |
|---|---|
| START! | Starts the game |
| JUMP! | Jumps. Press again in the air for a double jump |
| PAUSE / RESUME | Pauses or resumes the game |
| STOP | Ends the game |

Touching an incoming hurdle ends the game. You can replace the character and the hurdles with your own images using the upload inputs, and hurdle height follows the image's aspect ratio.

## Notes

- This package is ESM-only. From CommonJS (`require`), load it with `import()`
- Works in modern browsers that support Shadow DOM

## Development

```bash
pnpm install
pnpm dev        # demo page
pnpm test       # tests
pnpm typecheck  # type check
pnpm build      # build ESM, IIFE, and type declarations into dist
```

## Contributing

Bug reports, ideas, and pull requests are welcome.

- **Issues**: Open an [issue](https://github.com/salmonco/embeddable-mini-game/issues) for bugs or feature ideas. For bugs, include steps to reproduce and your browser
- **Pull requests**: Branch off `develop` and open your PR against `develop`. `main` holds released code

Before opening a PR:

1. Add or update tests for the behavior you change. Tests cover game logic and basic visuals (DOM structure, sizes, positions)
2. Make sure `pnpm test` and `pnpm typecheck` pass
3. Check your change in the demo page with `pnpm dev`

Commit messages follow `type(scope): summary`, for example `feat(game): add pause button` or `fix(character): land on the ground after a double jump`. Common types are `feat`, `fix`, `ui`, `test`, `refactor`, and `chore`.

## License

MIT
