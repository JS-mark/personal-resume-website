import type { CSSProperties } from 'react'
import { useEffect, useRef } from 'react'

export interface InViewVideoProps {
  mp4: string
  webm?: string
  poster?: string
  ariaLabel?: string
  className?: string
  style?: CSSProperties
}

/**
 * mp4 降级路径的 <video>：
 * - 进入视口：currentTime = 0 + play()
 * - 离开视口：pause()
 * 与 RemotionPlayerLazy 行为一致：滚出暂停、滚回从头播。
 */
export function InViewVideo({
  mp4,
  webm,
  poster,
  ariaLabel,
  className = '',
  style,
}: InViewVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video)
      return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            video.currentTime = 0
            void video.play().catch(() => { /* autoplay blocked */ })
          }
          else {
            video.pause()
          }
        }
      },
      { threshold: 0.35 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-label={ariaLabel}
      className={`w-full border border-terminal-border ${className}`}
      style={style}
    >
      {webm && <source src={webm} type="video/webm" />}
      <source src={mp4} type="video/mp4" />
    </video>
  )
}
