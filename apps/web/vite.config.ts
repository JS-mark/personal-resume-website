import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages 子路径部署：env BASE_PATH 由 deploy workflow 注入；
// 本地 dev 与其它部署目标（Vercel 等）都默认 '/'。
// 注意：用 `||` 而非 `??`——Vercel/CI 里 BASE_PATH 可能是空字符串，
// 空字符串会让 vite 产出相对路径 `./assets/`，SPA 子路由（/projects/:slug）
// 刷新时会解析成 /projects/assets/... → 404 白屏。空串也必须回退到 '/'。
const base = process.env.BASE_PATH || '/'

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    // @remotion/player 含 CJS 依赖，预打包避免 dev server 卡顿
    include: ['@remotion/player', 'remotion'],
  },
  build: {
    target: 'es2022',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules'))
            return
          if (/[/\\](?:@remotion[/\\]player|remotion)[/\\]/.test(id))
            return 'remotion-player'
          if (/[/\\](?:react|react-dom|react-router-dom|react-router)[/\\]/.test(id))
            return 'react-vendor'
        },
      },
    },
  },
  server: {
    port: 5173,
    host: true,
  },
})
