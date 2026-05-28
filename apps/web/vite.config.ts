import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages 子路径部署：env BASE_PATH 由 deploy workflow 注入；
// 本地 dev 与其它部署目标都默认 '/'。
const base = process.env.BASE_PATH ?? '/'

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
        manualChunks: {
          'remotion-player': ['@remotion/player', 'remotion'],
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  server: {
    port: 5173,
    host: true,
  },
})
