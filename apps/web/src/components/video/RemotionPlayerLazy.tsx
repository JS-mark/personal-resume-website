import type { PlayerRef } from '@remotion/player'
import type { ComponentType } from 'react'
import { lazy, Suspense, useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

const LazyPlayer = lazy(async () => {
  const mod = await import('@remotion/player')
  return { default: mod.Player }
})

export interface RemotionPlayerLazyProps<T extends Record<string, unknown>> {
  component: ComponentType<T>
  inputProps: T
  durationInFrames: number
  fps: number
  compositionWidth: number
  compositionHeight: number
  controls?: boolean
  /** 默认 true：进入视口自动播放，离开视口暂停 */
  playInView?: boolean
  /** 进入视口时跳回开头重新播（默认 true） */
  rewindOnEnter?: boolean
  loop?: boolean
  className?: string
}

/**
 * 用 ref + apply 同步策略避免时序竞争：
 * - IO 回调更新 inViewRef + 调 apply
 * - player ref callback 设置 playerRef + 调 apply
 * 无论谁先到，apply 总是从两个 ref 读取最新值并执行，不会出现"play 调到 null"或"player ready 后没人通知"的窗口。
 */
export function RemotionPlayerLazy<T extends Record<string, unknown>>({
  component,
  inputProps,
  durationInFrames,
  fps,
  compositionWidth,
  compositionHeight,
  controls = false,
  playInView = true,
  rewindOnEnter = true,
  loop = false,
  className = '',
}: RemotionPlayerLazyProps<T>) {
  const { t } = useTranslation()
  const aspectStyle = { aspectRatio: `${compositionWidth} / ${compositionHeight}` } as const

  const containerRef = useRef<HTMLDivElement | null>(null)
  const playerRef = useRef<PlayerRef | null>(null)
  const inViewRef = useRef(false)
  const hasPlayedOnceRef = useRef(false)

  const apply = useCallback(() => {
    const player = playerRef.current
    if (!player)
      return
    try {
      if (inViewRef.current) {
        // 首次进入视口时不 seekTo，避免与 Player 内部 mount 期间的初始化竞争（会看到一帧黑屏闪烁）
        if (rewindOnEnter && hasPlayedOnceRef.current)
          player.seekTo(0)
        const result = player.play() as unknown
        // play() 返回 Promise，autoplay 被拦时是 rejection，必须显式吞掉避免 unhandledrejection
        if (result && typeof (result as Promise<void>).catch === 'function')
          (result as Promise<void>).catch(() => { /* autoplay blocked，等用户交互或下一次 IO 回调再试 */ })
        hasPlayedOnceRef.current = true
      }
      else {
        player.pause()
      }
    }
    catch {
      // player 内部尚未就绪——下一次 IO 回调或 player 就绪时会再 apply 一次
    }
  }, [rewindOnEnter])

  const handlePlayerRef = useCallback(
    (instance: PlayerRef | null) => {
      playerRef.current = instance
      if (instance) {
        // Player 真正挂载完成的那一帧，立刻按当前 inViewRef 应用播放状态
        apply()
      }
    },
    [apply],
  )

  useEffect(() => {
    if (!playInView)
      return
    const el = containerRef.current
    if (!el)
      return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          inViewRef.current = entry.isIntersecting
          apply()
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [playInView, apply])

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden border border-terminal-border ${className}`}
      style={aspectStyle}
    >
      <Suspense
        fallback={(
          <div className="flex h-full w-full items-center justify-center bg-terminal-bgPanel font-mono text-sm text-terminal-fgDim">
            {t('common.loading')}
          </div>
        )}
      >
        <LazyPlayer
          ref={handlePlayerRef}
          component={component as ComponentType<Record<string, unknown>>}
          inputProps={inputProps as Record<string, unknown>}
          durationInFrames={durationInFrames}
          fps={fps}
          compositionWidth={compositionWidth}
          compositionHeight={compositionHeight}
          controls={controls}
          loop={loop}
          autoPlay
          initiallyMuted
          acknowledgeRemotionLicense
          style={{ width: '100%', height: '100%' }}
        />
      </Suspense>
    </div>
  )
}
