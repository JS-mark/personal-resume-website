# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install            # bootstrap (Node >=20, pnpm >=9)
pnpm dev                # turbo: web (5173) + remotion studio (3000) in parallel
pnpm dev:web            # web only
pnpm dev:remotion       # remotion studio only
pnpm typecheck          # turbo run typecheck (each package: tsc --noEmit)
pnpm lint               # eslint .  (auto-fix: pnpm lint:fix)
pnpm test               # turbo run test (web uses vitest; data/ui/remotion are no-op stubs)
pnpm render             # render every Remotion composition → apps/web/public/videos/*.mp4 + manifest.json
pnpm build              # turbo run build (web: tsc + vite build; render is the build for remotion)
pnpm ci                 # lint + typecheck + test + build
```

Run a single web test: `pnpm --filter web exec vitest run path/to/file.test.ts`.

## Architecture

Monorepo (pnpm workspace + Turborepo). Two apps consume two source-only internal packages.

```
apps/web         Vite + React 18 site (router, i18n, Tailwind)
apps/remotion    Remotion 4 video project — both Studio (dev) and CLI render
packages/data    Resume data + zod schema + helpers (single source of truth)
packages/ui      Shared components + Tailwind preset + design tokens
```

**Source-only packages.** `packages/data` and `packages/ui` have no build step; their `package.json` `main`/`types`/`exports` point directly at `src/*.ts`. Consumers import via `@resume/data`, `@resume/ui`, `@resume/ui/tailwind-preset`. Do not add a build script — Vite, Vitest, Remotion's webpack, and `tsc` all consume the TS sources directly.

**Tailwind sharing.** Both apps' `tailwind.config.ts` apply `cyberpunkPreset` from `@resume/ui/tailwind-preset` and include `../../packages/ui/src/**/*.{ts,tsx}` in `content` so shared components keep their utility classes.

**Resume data flow.** `packages/data/src/resume.ts` (and `projects.ts`) is the canonical resume. Web sections, Remotion compositions, and the CLI render script all read from it. All user-facing strings are `LocalizedString { zh, en }` — render with `localize(value, locale)` from `@resume/data`. Schema is enforced via zod (`packages/data/src/schema.ts`).

**Remotion: two entry points.**
- `apps/remotion/src/index.ts` calls `registerRoot(RemotionRoot)` — used **only** by the Remotion CLI/Studio.
- `apps/remotion/src/exports.ts` re-exports each composition component, its zod schema, defaults, and `compositionMeta` (fps/width/height/durationInFrames). The web app imports from here to render compositions interactively in `<Player>`. **Never add `registerRoot` to `exports.ts`** — that would execute on web import.
- Each composition lives at `src/compositions/<Name>/{<Name>.tsx, schema.ts, scenes/}`. The schema file exports `<name>Schema` (zod), `<name>Defaults`, and the `<Name>Props` type — keep all three in sync.

**Render pipeline.** `pnpm render` runs `apps/remotion/scripts/render-all.ts`, which bundles the Remotion entry, calls `renderMedia` for each job (one per composition; `ProjectShowcase` is rendered once per project), writes mp4s to `apps/web/public/videos/`, and writes `apps/web/public/manifest.json` mapping a `manifestKey` → `{ mp4, poster? }`. Both the videos directory and `manifest.json` are gitignored — they're CI-generated artifacts.

**Web video rendering: 3-tier fallback.** `VideoWithFallback` (`apps/web/src/components/video/`) chooses per request:
1. `prefers-reduced-motion` → static poster image
2. `navigator.connection.saveData` / slow link → pre-rendered mp4 from `manifest.json` via `InViewVideo`
3. default → lazy-loaded `@remotion/player` via `RemotionPlayerLazy` (auto play/pause on intersection, rewinds on re-enter)

The lazy `<Player>` wrapper uses `acknowledgeRemotionLicense` — it merely silences the dev-license console warning. Confirm Remotion licensing before commercial use.

**Web routing & i18n.** `App.tsx` mounts `BrowserRouter` (with v7 future flags) → `TerminalShell` → routes `/`, `/projects/:slug`, `*`. Locale state lives in `react-i18next` (`apps/web/src/i18n/`); URL `?lang=zh|en` overrides detection and is persisted to localStorage. UI strings live in `i18n/{en,zh}.json`; resume content stays in `packages/data` as `LocalizedString`.

## Conventions

- ESLint config is `@antfu/eslint-config` (`type: 'app'`, react + ts, 2-space, single quotes, no semis). Run `pnpm lint:fix` rather than hand-fixing style.
- TS strict + `noUncheckedIndexedAccess` + `noImplicitOverride`. Watch for `array[i]!` non-null assertions when indexing — they're load-bearing.
- pnpm overrides pin `react`, `react-dom`, and `zod` across the workspace; bump them in the root `package.json`, not per-package.
- `.npmrc` sets `node-linker=hoisted` because Remotion's webpack bundler does not handle pnpm's symlinked `node_modules`. Do not change it.
