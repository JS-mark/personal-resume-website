# `web` — 简历站点

赛博朋克风格的个人简历单页应用,基于 **Vite 5 + React 18 + TypeScript 5**。

## 开发

```bash
pnpm dev:web                    # 启动 dev server (http://localhost:5173)
pnpm --filter web build         # tsc --noEmit + vite build → ./dist
pnpm --filter web preview       # 预览生产产物
pnpm --filter web typecheck
pnpm --filter web exec vitest run [path]   # 单文件/单 case 测试
```

数据来自 `@resume/data` 的 workspace 引用,UI 原子组件来自 `@resume/ui`。修改简历内容应改 `packages/data/src/resume.ts`,而非本目录。

## 目录结构

```
src/
  App.tsx                  路由入口 (BrowserRouter + 3 条 route)
  main.tsx                 React root + i18n 初始化
  index.css                Tailwind 入口 + 全站基础样式 + 故障字 utility
  routes/                  HomePage / ProjectDetailPage / NotFoundPage
  sections/                首页各分区 (Hero / About / Skills / Experience / Projects / Contact)
  components/
    layout/                TerminalShell + StatusBar + NavCommands + SiteFooter
    effects/               MatrixRainCanvas / ScanlineOverlay / Reveal / GlitchText
    video/                 视频三级降级体系 (见下)
    locale/                LocaleSwitcher
  hooks/                   useReducedMotion / useSaveData / useActiveSection / useLocalizedString
  i18n/                    react-i18next 初始化 + en.json + zh.json
```

路径别名 `@/*` 指向 `src/*` (`vite.config.ts`)。

## 核心机制

### 视频三级降级 — `components/video/`

每个 Remotion composition 在网站内通过 `<VideoWithFallback>` 渲染,运行时按以下顺序选择呈现方式:

1. **`prefers-reduced-motion`** → 静态海报图 (`manifest.json` 的 `poster`)
2. **`navigator.connection.saveData` 或 `downlink < 2`** → 预渲染的 mp4 (`InViewVideo`,`preload="metadata"`,出入视口自动播放/暂停)
3. **默认** → `<RemotionPlayerLazy>` 通过动态 `import('@remotion/player')` 懒加载交互式播放器,出入视口自动 play/pause,重入时 seek 到 0

`manifest.json` 由 `pnpm render` 生成,位于 `public/manifest.json` (gitignored)。`getVideo(key)` 用 `manifestKey` 查询条目。

> `<RemotionPlayerLazy>` 上的 `acknowledgeRemotionLicense` prop 仅消除 dev 控制台的 license 提示,不代表已合规。商用前请确认 Remotion 的 license 条款。

### 国际化

- `react-i18next` 初始化在 `src/i18n/index.ts`,检测顺序 `querystring → localStorage → navigator`,querystring key 是 `lang`
- **UI 文案** (按钮、提示) 放 `i18n/{en,zh}.json`
- **简历内容** 始终保留为 `LocalizedString { zh, en }`,在 `useLocalizedString()` hook 里解析

### 路由

`App.tsx` 用 `BrowserRouter` 的 v7 future flags (`v7_startTransition`, `v7_relativeSplatPath`),提前适配 react-router v7。

## 构建产物

`vite build` 将 `@remotion/player + remotion`、`react + react-dom + react-router-dom` 拆为独立 chunk (`vite.config.ts` 里的 `manualChunks`),首屏不阻塞 Player 体积。
