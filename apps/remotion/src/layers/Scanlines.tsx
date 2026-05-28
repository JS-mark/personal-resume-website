import { AbsoluteFill } from 'remotion'

/**
 * CRT 扫描线叠加层，对所有 composition 通用。
 */
export function Scanlines({ opacity = 0.5 }: { opacity?: number }) {
  return (
    <AbsoluteFill
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 3px)',
        mixBlendMode: 'overlay',
        opacity,
        pointerEvents: 'none',
      }}
    />
  )
}
