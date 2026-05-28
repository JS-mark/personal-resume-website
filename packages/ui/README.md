# `@resume/ui` — 共享组件 + Tailwind preset + 设计 token

赛博朋克视觉系统的共享层:被 `apps/web` 与 `apps/remotion` 同时引用,确保两端配色、字体、组件外观完全一致。

## 不构建

**source-only** 包。`main` / `types` / `exports` 直接指向 `src/*.ts`。**不要添加 build step**(理由同 `@resume/data`)。

## 导出

```ts
// 设计 token (颜色) + 原子组件 — 都从顶层桶导出
import { colors, NeonButton, ProgressBar, Tag, TerminalWindow } from '@resume/ui'

// Tailwind preset(应用到 apps 的 tailwind.config.ts)
import { cyberpunkPreset } from '@resume/ui/tailwind-preset'

// 也可以从子路径直接拿 token
import { colors as colorsFromTokens } from '@resume/ui/tokens'
```

## 文件

```
src/
  index.ts                     桶导出
  tokens/
    index.ts                   桶导出
    colors.ts                  唯一允许出现 #00f5ff 等字面值的位置
  tailwind-preset.ts           cyberpunkPreset (colors / fontFamily / boxShadow / bgImage / animation / keyframes)
  components/
    TerminalWindow.tsx         macOS 风窗口容器(可选三色控制点 + 标题 + 内容)
    NeonButton.tsx             霓虹边框按钮(cyan/magenta/ghost × sm/md)
    ProgressBar.tsx            终端风进度条(纯填充 / 20 段格子)
    Tag.tsx                    霓虹标签(cyan/magenta/green/muted)
```

## 在 app 中接入 Tailwind preset

```ts
// apps/<app>/tailwind.config.ts
import type { Config } from 'tailwindcss'
import { cyberpunkPreset } from '@resume/ui/tailwind-preset'

export default {
  presets: [cyberpunkPreset as Config],
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}', // ← 必须包含,否则共享组件的 utility 类会被 purge
  ],
} satisfies Config
```

## Token 命名

| 命名空间 | 用途 |
|---|---|
| `neon.cyan / magenta / green / purple / yellow` | 强调色、霓虹光晕 |
| `terminal.bg / bgAlt / bgPanel` | 三层背景(深→浅) |
| `terminal.fg / fgDim / fgMuted` | 三级文本 |
| `terminal.border / borderGlow` | 边框 |
| `status.success / warning / error / info` | 语义色 |

预定义动画:`glitch` / `scanline` / `flicker` / `cursor-blink` / `pulse-neon`。预定义阴影:`shadow-neon-cyan` / `shadow-neon-magenta` / `shadow-neon-green` / `shadow-panel`。

## 约束

- 任何新的颜色字面值都应先加进 `tokens/colors.ts`,再通过 token 引用。组件内禁止硬编码 `#00f5ff` 之类的值。
- 组件保持**零运行时依赖**(只用 Tailwind 类),以便 Remotion webpack 与 Vite 都能直接打包源码。
- 组件需要在 SSR / Node 渲染管线下也能工作(被 `pnpm render` 消费),因此不要使用 `window` / `document` 等浏览器 API,需要副作用时用 `useEffect`。
