import rawManifest from '../../../public/manifest.json'

export interface VideoEntry {
  mp4?: string
  webm?: string
  poster?: string
}

const manifest = rawManifest as Record<string, VideoEntry>

export function getVideo(key: string): VideoEntry | undefined {
  return manifest[key]
}
