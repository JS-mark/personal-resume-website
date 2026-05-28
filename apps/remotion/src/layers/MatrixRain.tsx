import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion'
import { theme } from '../theme'

export interface MatrixRainProps {
  opacity?: number
  /** 列数（横向字符密度） */
  columns?: number
  /** 字符落下速度系数（每帧像素） */
  speed?: number
}

/**
 * 基于 useCurrentFrame 的确定性矩阵雨。
 * 不使用 RAF/Canvas（Remotion 渲染时是逐帧的，无 RAF 时钟）。
 */
const CHARS = '01ABCDEFｱｲｳｴｵｶｷｸｹｺ<>{}[]/\\$#'.split('')

export function MatrixRain({ opacity = 0.15, columns = 80, speed = 12 }: MatrixRainProps) {
  const frame = useCurrentFrame()
  const { width, height } = useVideoConfig()
  const colWidth = width / columns
  const fontSize = Math.round(colWidth * 0.85)

  const drops = Array.from({ length: columns }, (_, i) => {
    const offset = (i * 37) % 60
    const y = ((frame * speed + offset * fontSize) % (height + fontSize * 4)) - fontSize * 4
    return { x: i * colWidth, y, charIdx: (frame + i * 7) % CHARS.length }
  })

  return (
    <AbsoluteFill style={{ opacity, pointerEvents: 'none' }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {drops.map((d, i) => (
          <text
            key={i}
            x={d.x}
            y={d.y}
            fill={theme.neon.cyan}
            fontFamily='"JetBrains Mono", ui-monospace, monospace'
            fontSize={fontSize}
          >
            {CHARS[d.charIdx]}
          </text>
        ))}
      </svg>
    </AbsoluteFill>
  )
}
