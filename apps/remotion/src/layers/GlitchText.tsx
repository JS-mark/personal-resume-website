import type { CSSProperties } from 'react'
import { useCurrentFrame } from 'remotion'
import { theme } from '../theme'

interface GlitchTextProps {
  children: string
  fontSize?: number
  fontWeight?: number | string
  /** 故障强度 0~1 */
  intensity?: number
  style?: CSSProperties
}

/**
 * 通过两个 RGB 分离副本叠加模拟故障字。
 * 位移基于 useCurrentFrame，渲染确定。
 */
export function GlitchText({
  children,
  fontSize = 96,
  fontWeight = 700,
  intensity = 1,
  style,
}: GlitchTextProps) {
  const frame = useCurrentFrame()
  const phase = frame % 30
  const dx1 = (Math.sin(frame / 3) * 4 - 2) * intensity
  const dy1 = (Math.cos(frame / 5) * 4 - 2) * intensity
  const dx2 = -dx1
  const dy2 = -dy1

  const baseStyle: CSSProperties = {
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    fontSize,
    fontWeight,
    lineHeight: 1.1,
    position: 'relative',
    display: 'inline-block',
    ...style,
  }

  const layerStyle = (color: string, dx: number, dy: number): CSSProperties => ({
    position: 'absolute',
    inset: 0,
    color,
    transform: `translate(${dx}px, ${dy}px)`,
    mixBlendMode: 'screen',
    opacity: phase < 3 ? 1 : 0.85,
  })

  return (
    <span style={baseStyle}>
      <span style={layerStyle(theme.neon.magenta, dx1, dy1)}>{children}</span>
      <span style={layerStyle(theme.neon.cyan, dx2, dy2)}>{children}</span>
      <span style={{ position: 'relative', color: theme.terminal.fg }}>{children}</span>
    </span>
  )
}
