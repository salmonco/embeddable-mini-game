import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        // 게임 스타일을 shadow root에 넣는지 확인하려면 CSS 내용이 필요하다
        css: {
            include: [/\.css/],
        },
    },
})
