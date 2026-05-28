# Personal Resume Website

暗黑赛博朋克风格的个人简历站点，采用 **Vite + React + TypeScript** 构建网站，**Remotion** 制作炫酷的技能/项目展示视频。

## 技术栈

- **Monorepo**：pnpm workspace + Turborepo
- **网站**：Vite 5 · React 18 · TypeScript 5 · Tailwind CSS v3 · React Router v6 · react-i18next
- **视频**：Remotion 4（视频内核）+ `@remotion/player`（网站内交互式播放）
- **数据**：基于 [JSON Resume](https://jsonresume.org/) schema 扩展，中英双语
- **部署**：静态产物（Cloudflare Pages / Vercel / GitHub Pages）

## 工作区结构

```
apps/
  web/         # 简历网站（Vite + React）
  remotion/    # Remotion 视频工程（5 个 composition）
packages/
  data/        # 简历数据 + TS 类型 + zod schema
  ui/          # 共享组件 + Tailwind preset
```

## 开发

```bash
# 一次性安装
pnpm install

# 同时启动 web (5173) + remotion studio (3000)
pnpm dev

# 单独启动
pnpm dev:web
pnpm dev:remotion

# 类型检查 / Lint / 测试
pnpm typecheck
pnpm lint
pnpm test

# 渲染所有 Remotion 视频到 apps/web/public/videos/
pnpm render

# 生产构建
pnpm build
```

## Remotion 视频场景

| Composition | 说明 |
|---|---|
| HeroIntro | 终端打字效果 + 矩阵雨背景，呈现姓名/标语 |
| SkillsShowcase | 技能进度条 / 标签云 / 雷达图动画 |
| ProjectShowcase | 项目代码扫过 + 架构图 + metrics 动画（可参数化） |
| CareerTimeline | 职业经历水平时间轴动画 |
| ContactCard | 末尾名片 + GitHub/邮箱/二维码翻转动画 |

每个 composition 支持运行时参数（`<Player inputProps>`）和 CLI 渲染（`pnpm render`）两种调用方式。

## 简历定制

修改 `packages/data/src/resume.ts` 即可换为自己的简历，所有视图与视频自动重渲染。
