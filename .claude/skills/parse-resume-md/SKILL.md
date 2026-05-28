---
name: parse-resume-md
description: |
  Parse a Chinese resume Markdown file (the user's own résumé write-up) into the typed `Resume` data shape used by this project, and write it to `packages/data/src/resume.ts`. Trigger when the user says things like:
    - "把这份简历 md 解析到项目数据"
    - "导入这个 md 简历"
    - "用这份 md 替换 resume.ts 里的数据"
    - "parse this resume markdown into the data file"
  The user usually pastes the md inline or saves it under `docs/resume.md` / `resume.md` at repo root.
---

# Parse Resume Markdown → `Resume` typed data

This skill turns a free-form Chinese-language Markdown résumé into the strongly-typed `Resume` value that drives both the website (`apps/web`) and the Remotion compositions (`apps/remotion`). Replacing the source data is the **single edit** needed to re-skin the entire site for a different person.

## When to run

Trigger automatically when the user provides a markdown résumé (inline, file path, or pasted block) and asks to "import / parse / load it into the project data". If multiple md files are present, ask which one.

## Inputs

1. **Source markdown** — the user's resume. Common section headers (in Chinese):
   - `# 标题行`（页面标题/职位关键词）
   - `## 个人信息` — name, phone, email, city, years, intent
   - `## 个人简介` — multi-paragraph summary
   - `## 技能栈` — usually grouped by L3 sub-headings (`### 前端基础` / `### 富文本编辑器` / `### AI 应用开发` / `### 工程能力` etc.)
   - `## 工作经历` — each L3 block is one job: `### 公司｜职位` then `时间：…` `地点：…` `主要职责：` bullet list
   - `## 项目经历` — same shape as work; sometimes merged into 工作经历
   - `## 教育经历` — institution, area, degree, dates

2. **Type contract** — read `packages/data/src/types.ts` first; the writer must match it exactly. The Zod mirror is at `packages/data/src/schema.ts` — useful as a sanity check.

3. **Existing resume** — read `packages/data/src/resume.ts` for current shape and any optional fields the user already filled (e.g. `meta.credits`).

## Steps

1. **Read** `packages/data/src/types.ts` and `packages/data/src/resume.ts`. Note all required vs. optional fields and the `LocalizedString = { zh, en }` shape — every user-facing string field needs both locales.

2. **Parse** the markdown into structured intermediate data. Don't try regex acrobatics; just walk the headings and bullets. Use the field mapping below.

3. **Translate** every `LocalizedString` to English. The source is Chinese; produce idiomatic, concise English suitable for an international resume (avoid literal translation). Keep proper nouns (people / company / product names) untranslated unless an obvious English form exists.

4. **Infer** skill `level` (1–5) and `category` for each skill mentioned, using the heuristics below.

5. **Write** the new `resume.ts` — preserve `meta.credits` from the existing file unless the user asks to remove it. Update `meta.lastModified` to `new Date().toISOString()` (kept dynamic) and `meta.canonical` only if user gives a new URL.

6. **Verify**: run `pnpm typecheck` at the repo root. If it fails, fix and re-run. Do NOT consider the job done until typecheck is green.

7. **Report**: print a one-paragraph diff summary — who, what fields populated, how many work / project / skill items, and any guesses you made (years, levels) so the user can correct them.

## Field mapping

### `basics`

| md source | target field |
|---|---|
| `姓名：X` | `name` (latin form, fallback to pinyin) + `nameLocalized: { zh: X, en: <pinyin/英文名> }` |
| `职位 / 求职方向` line + page title | `label: LocalizedString` |
| `邮箱` | `email` |
| `手机` | `phone` |
| `城市` | `location.city: LocalizedString`; `countryCode` defaults to `'CN'` unless obvious |
| 第一段简介 / 标语 | `summary: LocalizedString` |
| 多个亮点短句（如有） | `taglines: LocalizedString[]` (3–5 条；从简介中提炼，每条带 `> ` 前缀，例如 `> 我用代码讲故事`) |
| GitHub / X / LinkedIn 链接 | `profiles[]` |
| 主页 url | `url` |

If `求职方向` lists multiple roles (e.g. "AI 应用 / 富文本编辑器"), pick the strongest one for `label.zh` and merge the rest into `summary` or `taglines`.

### `work`

Each L3 block under `## 工作经历`:

| md | target |
|---|---|
| `### 公司｜职位` | split on `｜` → `name.zh`, `position.zh` |
| `时间：YYYY.M - YYYY.M` or `至今` | `startDate: 'YYYY-MM'`, `endDate: 'YYYY-MM' \| undefined` |
| `主要职责` 列表项 | `highlights[]: LocalizedString[]` (each bullet) |
| 顶部一段简述（如有）| `summary: LocalizedString`; otherwise synthesize one from highlights |
| 提到的技术名词 | `techStack: string[]` (extract canonical names: React, TypeScript, Tiptap, ProseMirror, etc.) |
| 数字成果（"提升 50%"、"覆盖 12 个产品线"）| `metrics?: Array<{ label, value, delta? }>` if reasonably extractable |

⚠️ **Sort `work[]` by `startDate` descending** (most recent first) — the website's ExperienceSection assumes this order.

### `education`

Standard JSON Resume shape; if the md has no education section, leave `education: []`.

### `skills`

This is the most opinionated transform.

The md typically groups skills under L3 headings like `### 前端基础` / `### 富文本编辑器` / `### AI 应用开发` / `### 工程能力`. **Don't** dump every bullet as a separate skill — instead, extract canonical technology names (TypeScript, React, Vue, Tiptap, ProseMirror, Vite, etc.) and produce ~10–18 entries.

| heuristic | rule |
|---|---|
| `category` | language: TS/JS/Python/Rust/Go; framework: React/Vue/Node.js/Tiptap/ProseMirror/CKEditor5; tool: Vite/Webpack/pnpm/ESLint/Git; platform: AWS/K8s/Docker/Cloud; soft: 架构 / 团队 / 工程化 / Mentoring |
| `level` (1–5) | "精通 / 熟练掌握" → 5; "熟悉 / 主导 / 多年经验" → 4; "熟悉" 单独使用 → 3 or 4 (use surrounding context); "了解 / 接触" → 2; rare mention → 1 |
| `yearsExperience` | derive from work tenure; e.g. if user has 8 years overall and TS/React used throughout, set 8; for newer skills (Tiptap, AI), use 1–2 |
| keywords | optional — only add if md explicitly enumerates keywords for that skill |

### `projects`

If the md has `## 项目经历` separate from `## 工作经历`, parse each as a `ProjectItem`. Otherwise leave `projects: []` or keep the existing demo projects (ask user). Each project needs:

- `slug` — kebab-case from project name (English/transliterated)
- `name`, `tagline`, `description` — all `LocalizedString`
- `startDate` / `endDate`
- `techStack: string[]`
- `highlights: LocalizedString[]` — bullet points
- `metrics?` — extract numbers if mentioned
- `media: { videoCompositionId: 'ProjectShowcase' }` — so the project gets a Remotion showcase video
- `codeSnippet?` — only if md includes a code block; otherwise omit

### `meta`

Preserve `version` and `credits` from existing file. Update `lastModified`. Set `canonical` to user's site URL if known.

## Translation guidelines

- **Job titles**: 资深前端工程师 → "Senior Frontend Engineer"; 前端架构师 → "Frontend Architect"; 技术负责人 → "Tech Lead"
- **Action verbs in highlights**: 主导 → "Led"; 负责 → "Owned" or "Drove"; 参与 → "Contributed to"; 推动 → "Championed" / "Drove adoption of"
- **Tech stack** stays in English (no translation)
- **Company names**: keep Chinese unless company has an established English brand (e.g. 海底捞 → "Haidilao"; 新浪微博 → "Weibo"; 伴鱼 → "Banyu"). When unsure, transliterate (Pinyin) and capitalize.
- **Cities**: 北京 → "Beijing", 上海 → "Shanghai", etc.

## Common pitfalls

- The md may list duplicate / contradictory tenures (the user's draft sometimes has multiple "2021.10 - 至今" rows because of templating). Reconcile: pick the latest occurrence, or ask the user if dates conflict.
- `summary` for each work item is often missing; synthesize one sentence from the highlights so the website's ExperienceSection has something to render above the bullet list.
- Don't introduce fields not in `Resume` type — TypeScript will reject them. Re-read `types.ts` if unsure.
- `LocalizedString` for empty/missing values: don't use empty strings; either omit the optional field entirely or fill both locales.

## Output

Write the new file in one shot via `Write` tool — never patch incrementally on `resume.ts` for a full re-import (too error-prone). Preserve the `import` lines and the `projects` re-export at the bottom unless explicitly replacing projects too.

After writing, run:

```bash
pnpm typecheck
```

If green, summarize and stop. If red, iterate.

## Reference: minimal Resume value shape

```ts
import type { Resume } from './types'
import { projects } from './projects'

export const resume: Resume = {
  $schema: 'https://jsonresume.org/schema/',
  basics: {
    name: '...',                     // latin
    nameLocalized: { zh: '...', en: '...' },
    label: { zh: '...', en: '...' },
    email: '...',
    phone: '...',
    url: 'https://...',
    summary: { zh: '...', en: '...' },
    location: { city: { zh: '...', en: '...' }, countryCode: 'CN' },
    profiles: [{ network: 'GitHub', username: '...', url: '...' }],
    taglines: [{ zh: '> ...', en: '> ...' }],
  },
  work: [/* sorted desc by startDate */],
  education: [],
  skills: [/* 10–18 canonical entries */],
  projects,                          // keep imported demo projects, OR replace with parsed ones
  meta: {
    version: '1.0.0',
    lastModified: new Date().toISOString(),
    canonical: 'https://...',
    credits: { author: { zh, en }, sourceUrl, license: 'MIT', openSource: true },
  },
}
```
