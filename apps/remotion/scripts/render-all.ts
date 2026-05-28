/**
 * 渲染所有 composition 到 apps/web/public/videos/，并写入 manifest.json。
 *
 * 用法：pnpm --filter @resume/remotion render
 * （从 apps/remotion 目录执行 tsx scripts/render-all.ts）
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs/promises'
import { bundle } from '@remotion/bundler'
import { renderMedia, selectComposition } from '@remotion/renderer'
import { resume } from '@resume/data'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REMOTION_ROOT = path.resolve(__dirname, '..')
const ENTRY = path.join(REMOTION_ROOT, 'src/index.ts')
// 视频是运行时静态资源 → public/
const OUT_DIR = path.resolve(REMOTION_ROOT, '../web/public/videos')
// manifest 是被 TS 编译期 import 的数据 → src/generated/
// （Vite 8 起不再允许从 JS 中直接 import public/ 下的文件）
const MANIFEST_PATH = path.resolve(REMOTION_ROOT, '../web/src/generated/manifest.json')

interface RenderJob {
  /** Remotion composition id */
  compositionId: string
  /** manifest 中的 key */
  manifestKey: string
  /** 输出文件名（不含扩展） */
  outBase: string
  inputProps: Record<string, unknown>
}

const jobs: RenderJob[] = [
  {
    compositionId: 'HeroIntro',
    manifestKey: 'heroIntro',
    outBase: 'hero-intro',
    inputProps: {
      name: resume.basics.name,
      taglines: resume.basics.taglines ?? [],
      locale: 'en',
    },
  },
  {
    compositionId: 'SkillsShowcase',
    manifestKey: 'skills',
    outBase: 'skills',
    inputProps: { skills: resume.skills, locale: 'en', layout: 'bars' },
  },
  {
    compositionId: 'CareerTimeline',
    manifestKey: 'timeline',
    outBase: 'timeline',
    inputProps: { work: resume.work, locale: 'en' },
  },
  {
    compositionId: 'ContactCard',
    manifestKey: 'contact',
    outBase: 'contact',
    inputProps: {
      basics: resume.basics,
      qrPayload: resume.basics.url ?? '',
      locale: 'en',
    },
  },
  ...resume.projects.map<RenderJob>(p => ({
    compositionId: 'ProjectShowcase',
    manifestKey: `project-${p.slug}`,
    outBase: `project-${p.slug}`,
    inputProps: { project: p, locale: 'en' },
  })),
]

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true })
  await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true })

  console.log('[render] bundling remotion entry...')
  const serveUrl = await bundle({
    entryPoint: ENTRY,
    webpackOverride: config => config,
  })

  const manifest: Record<string, { mp4: string; poster?: string }> = {}

  for (const job of jobs) {
    console.log(`[render] ${job.compositionId} → ${job.outBase}.mp4`)
    const composition = await selectComposition({
      serveUrl,
      id: job.compositionId,
      inputProps: job.inputProps,
    })

    const mp4Path = path.join(OUT_DIR, `${job.outBase}.mp4`)
    await renderMedia({
      composition,
      serveUrl,
      codec: 'h264',
      outputLocation: mp4Path,
      inputProps: job.inputProps,
    })

    manifest[job.manifestKey] = {
      mp4: `/videos/${job.outBase}.mp4`,
    }
  }

  await fs.writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(`[render] manifest written to ${MANIFEST_PATH}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
