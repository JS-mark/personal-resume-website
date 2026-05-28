import type { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useSaveData } from '@/hooks/useSaveData'
import { InViewVideo } from './InViewVideo'
import { getVideo } from './manifest'
import { RemotionPlayerLazy } from './RemotionPlayerLazy'

export interface VideoWithFallbackProps<T extends Record<string, unknown>> {
  /** manifest 中的 key（决定降级时使用哪个 mp4/poster） */
  manifestKey: string
  /** Remotion composition 组件 */
  component: ComponentType<T>
  inputProps: T
  durationInFrames: number
  fps: number
  compositionWidth: number
  compositionHeight: number
  /** 滚动到视口时自动播放、离开时暂停（默认 true，只作用于 Player） */
  playInView?: boolean
  loop?: boolean
  /** 用 react-i18next 提供的友好备注 */
  ariaLabel?: string
  className?: string
}

/**
 * 三级降级策略：
 * 1) prefers-reduced-motion → 静态海报
 * 2) saveData 或慢速网络 → 预渲染的 mp4（preload="none"）
 * 3) 默认 → 懒加载 @remotion/player 交互式播放
 */
export function VideoWithFallback<T extends Record<string, unknown>>(props: VideoWithFallbackProps<T>) {
  const { t } = useTranslation()
  const reduced = useReducedMotion()
  const saveData = useSaveData()
  const entry = getVideo(props.manifestKey)
  const aspectStyle = {
    aspectRatio: `${props.compositionWidth} / ${props.compositionHeight}`,
  } as const

  if (reduced) {
    if (entry?.poster) {
      return (
        <img
          src={entry.poster}
          alt={props.ariaLabel ?? props.manifestKey}
          className={`w-full border border-terminal-border ${props.className ?? ''}`}
          style={aspectStyle}
        />
      )
    }
    return (
      <div
        className={`flex w-full items-center justify-center border border-terminal-border bg-terminal-bgPanel font-mono text-xs text-terminal-fgDim ${props.className ?? ''}`}
        style={aspectStyle}
      >
        {t('common.loading')}
      </div>
    )
  }

  if (saveData && entry?.mp4) {
    return (
      <InViewVideo
        mp4={entry.mp4}
        webm={entry.webm}
        poster={entry.poster}
        ariaLabel={props.ariaLabel ?? props.manifestKey}
        className={props.className}
        style={aspectStyle}
      />
    )
  }

  return (
    <RemotionPlayerLazy
      component={props.component}
      inputProps={props.inputProps}
      durationInFrames={props.durationInFrames}
      fps={props.fps}
      compositionWidth={props.compositionWidth}
      compositionHeight={props.compositionHeight}
      playInView={props.playInView}
      loop={props.loop}
      controls={false}
      className={props.className}
    />
  )
}
