# `@resume/data` — 简历数据 + 类型 + zod schema

简历的**单一数据源**。所有视图(`apps/web` 各 section)、Remotion composition 的 `defaultProps`、批渲染脚本的 `inputProps` 都从此读取。

## 不构建

本包是 **source-only**:`package.json` 的 `main` / `types` / `exports` 直接指向 `src/*.ts`。Vite、Vitest、Remotion 的 webpack 与 `tsc` 都直接消费 TS 源码 — **请勿添加 build step**,否则会破坏 monorepo 内的引用。

## 导出

```ts
import {
  resume,                // 简历主数据 (单例)
  projects,              // 项目数组
  projectsBySlug,        // { [slug]: ProjectItem }
  localize,              // (LocalizedString, locale) → string
  formatYearMonth,       // ISO yyyy-mm → 'Jan 2024' | '2024 年 1 月'
  skillLevelLabel,       // 1-5 → '入门' / 'Expert' …
  calculateYearsOfExperience,
  resumeSchema,          // zod
  // 以及全部 TS 类型
} from '@resume/data'
```

子路径导出:

```ts
import { resumeSchema } from '@resume/data/schema'  // 仅 zod
import type { Resume } from '@resume/data/types'    // 仅类型
```

## 文件

```
src/
  index.ts          桶导出
  resume.ts         resume 主单例(姓名 / basics / work / education / skills / projects / meta)
  projects/
    index.ts        projects 数组 + projectsBySlug 索引
    project-*.ts    单个 ProjectItem 定义(每个项目一个文件)
  types.ts          TS 类型定义(JSON Resume schema 扩展)
  schema.ts         zod schema,镜像 types.ts;同时被 Remotion v4 <Composition schema={...}> 消费
  helpers.ts        localize / formatYearMonth / skillLevelLabel / 总年数计算
```

## 数据模型要点

- **基于 [JSON Resume](https://jsonresume.org/) schema 扩展**(`$schema: 'https://jsonresume.org/schema/'`)。原 schema 之上增加了 `taglines`、`techStack`、`metrics`、`archDiagram`、`media`、`codeSnippet` 等字段,服务于 Remotion 视频。
- **所有面向用户的字符串都是 `LocalizedString { zh: string; en: string }`**,而非根据当前 locale 给出的字符串。消费方调用 `localize(value, locale)` 解析,缺失时回退到 `en`。
- **日期格式**统一为 ISO `yyyy-mm`。`formatYearMonth` 是唯一允许格式化日期的位置。
- **skill.level 是 `1 | 2 | 3 | 4 | 5`** 字面量联合,不是普通 `number`。新增技能时务必给 `as 1`/`as 5` 这种字面量值。

## 修改简历

直接编辑 `src/resume.ts` 与 `src/projects/*.ts`。所有视图与视频会在下次 `pnpm dev` / `pnpm render` 自动消费新数据 — 无需额外注册。
