import { defineConfig } from 'vitest/config'

export default defineConfig({
    build: {
        // NPM 패키지용 빌드
        lib: {
            entry: 'src/index.ts',
            // IIFE 빌드를 script 태그로 불러오면 window.MiniGame으로 쓴다
            name: 'MiniGame',
            fileName: 'mini-game',
            formats: ['es', 'iife'],
        },
    },
    test: {
        // 게임 스타일을 shadow root에 넣는지 확인하려면 CSS 내용이 필요하다
        css: {
            include: [/\.css/],
        },
    },
})
