# `@resume/remotion` — Remotion 视频工程

基于 **Remotion 4** 的 5 个 composition,既能在 Studio 里调试,又能被 `apps/web` 通过 `@remotion/player` 嵌入,还能由 `scripts/render-all.ts` 批量渲染为 mp4。

## 命令

```bash
pnpm dev:remotion                       # remotion studio (http://localhost:3000)
pnpm render                             # 渲染全部 composition → ../web/public/videos/ + manifest.json
pnpm --filter @resume/remotion typecheck
```

`pnpm render` 实际等价于 `tsx scripts/render-all.ts`。`build`/`test` 为占位 (本包没有独立构建产物或单测)。

## Composition 一览

| ID | 时长 (frames@30fps) | 说明 |
|---|---:|---|
| `HeroIntro` | 300 | 终端打字效果 + 矩阵雨 + CRT 边框 + 扫描线,用于姓名/标语 |
| `SkillsShowcase` | 450 | 技能进度条 / 标签云 / 雷达图(三种 layout 可选) |
| `ProjectShowcase` | 600 | 代码扫过 + 架构图 + metrics 动画(可参数化,每个项目渲染一次) |
| `CareerTimeline` | 540 | 职业经历水平时间轴 |
| `ContactCard` | 210 | 名片 + GitHub/邮箱/二维码翻转动画 |

全部 1920×1080 @ 30fps,帧时长定义在 `src/Root.tsx` 与 `src/exports.ts` 的 `compositionMeta`。

## 两个入口点(关键约束)

```
src/
  index.ts        ─ registerRoot(RemotionRoot)。仅由 Remotion CLI / Studio / 渲染管线加载。
  exports.ts      ─ 重导出每个 composition + zod schema + defaults + compositionMeta。
                    apps/web 通过 `@resume/remotion` 引用此文件以驱动 <Player>。
```

**禁止在 `exports.ts` 中调用 `registerRoot`**,否则 web 端 import 时会执行注册并报错。新增 composition 时:

1. 在 `src/compositions/<Name>/` 创建组件、`schema.ts` (`<name>Schema`、`<name>Defaults`、`<Name>Props` 三件套保持同步)、可选 `scenes/`
2. 在 `src/Root.tsx` 注册 `<Composition>`
3. 在 `src/exports.ts` 加 re-export 与 `compositionMeta` 项
4. 在 `scripts/render-all.ts` 加渲染 job

## 目录结构

```
src/
  Root.tsx                           注册 5 个 <Composition>,defaultProps 取自 @resume/data
  index.ts                           registerRoot 入口
  exports.ts                         给 web 用的 re-exports + compositionMeta
  fonts.ts                           ensureFonts() — 在 composition 顶层调用以预加载 JetBrains Mono
  theme.ts                           复用 @resume/ui 的色板 token
  styles.css                         Tailwind 入口
  layers/                            通用合成层 (CRTFrame / MatrixRain / Scanlines / NeonGrid / GlitchText)
  compositions/<Name>/
    <Name>.tsx                       composition 根组件
    schema.ts                        zod schema + defaults + Props 类型
    scenes/                          子场景(可选)
scripts/render-all.ts                CLI 批渲染脚本
remotion.config.ts                   Remotion CLI 配置(并发 / Tailwind / 入口)
tailwind.config.ts                   apply cyberpunkPreset (与 web 共用)
```

## Tailwind in Remotion

`remotion.config.ts` 通过 `Config.overrideWebpackConfig(enableTailwind)` 接入 Tailwind。`tailwind.config.ts` 的 `content` 同时包含 `../../packages/ui/src/**` 以保留共享组件的 utility 类。

## 渲染管线 (`scripts/render-all.ts`)

1. `bundle()` Remotion 入口
2. 对每个 job (4 个固定 + 每个 project 一个 `ProjectShowcase`) 调用 `selectComposition` + `renderMedia`
3. mp4 写入 `apps/web/public/videos/<outBase>.mp4`
4. 写 `apps/web/public/manifest.json`,key 为 `manifestKey` (`heroIntro` / `skills` / `timeline` / `contact` / `project-<slug>`),供 web 端 `getVideo(key)` 查询

视频与 manifest 文件全部 gitignored — 是 CI 产物。本地未跑 `pnpm render` 时,网站会优先走 Player 路径。

## 重要前置

`.npmrc` 中的 `node-linker=hoisted` **不可改**:Remotion 的 webpack bundler 不能正确处理 pnpm 默认的 symlinked `node_modules`。整个 monorepo 因此而采用 hoisted 布局。
