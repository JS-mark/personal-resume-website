import rawManifest from '../../../public/manifest.json'

export interface VideoEntry {
  mp4?: string
  webm?: string
  poster?: string
}

const manifest = rawManifest as Record<string, VideoEntry>

/**
 * 把 manifest 里的根相对路径（如 '/videos/foo.mp4'）拼上 Vite 的 BASE_URL，
 * 让 GitHub Pages 子路径部署也能正确加载视频。
 */
function withBase(url: string | undefined): string | undefined {
  if (!url)
    return undefined
  // 已经是绝对 URL（http:// 或 //）就原样返回
  if (/^(?:https?:)?\/\//i.test(url))
    return url
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  if (url.startsWith('/'))
    return `${base}${url}`
  return `${base}/${url}`
}

export function getVideo(key: string): VideoEntry | undefined {
  const entry = manifest[key]
  if (!entry)
    return undefined
  return {
    mp4: withBase(entry.mp4),
    webm: withBase(entry.webm),
    poster: withBase(entry.poster),
  }
}
