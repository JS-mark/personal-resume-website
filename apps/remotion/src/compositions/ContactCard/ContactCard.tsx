import { localize } from '@resume/data'
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { ensureFonts, fontFamily } from '../../fonts'
import { CRTFrame } from '../../layers/CRTFrame'
import { Scanlines } from '../../layers/Scanlines'
import { theme } from '../../theme'
import type { ContactCardProps } from './schema'

ensureFonts()

/** 名片 Y 轴翻转 + QR 描边动画 */
export function ContactCard({ basics, qrPayload, locale }: ContactCardProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const flipProgress = spring({ frame: frame - 10, fps, config: { damping: 18, stiffness: 80 } })
  const rotateY = interpolate(flipProgress, [0, 1], [180, 0])

  const qrLength = 8 * 40
  const qrDraw = interpolate(frame, [60, 160], [qrLength, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  const name = basics.nameLocalized ? localize(basics.nameLocalized, locale) : basics.name

  return (
    <AbsoluteFill style={{ backgroundColor: theme.terminal.bg, fontFamily }}>
      <CRTFrame>
        <div
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: 1600,
          }}
        >
          <div
            style={{
              width: 1100,
              height: 600,
              border: `2px solid ${theme.neon.cyan}`,
              background: theme.terminal.bgPanel,
              padding: 56,
              transform: `rotateY(${rotateY}deg)`,
              transformStyle: 'preserve-3d',
              boxShadow: '0 0 64px rgba(0,245,255,0.4)',
              display: 'flex',
              gap: 48,
              alignItems: 'center',
            }}
          >
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 22, color: theme.terminal.fgDim }}>$ contact --me</p>
              <h1
                style={{
                  fontSize: 96,
                  fontWeight: 700,
                  color: theme.neon.cyan,
                  textShadow: '0 0 24px rgba(0,245,255,0.6)',
                  marginTop: 8,
                }}
              >
                {name}
              </h1>
              <p style={{ fontSize: 32, color: theme.neon.magenta, marginTop: 8 }}>
                {localize(basics.label, locale)}
              </p>
              <ul style={{ marginTop: 36, listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li style={{ fontSize: 24, color: theme.terminal.fg }}>
                  <span style={{ color: theme.terminal.fgDim, display: 'inline-block', width: 110 }}>email</span>
                  <span style={{ color: theme.neon.cyan }}>{basics.email}</span>
                </li>
                {basics.url && (
                  <li style={{ fontSize: 24, color: theme.terminal.fg }}>
                    <span style={{ color: theme.terminal.fgDim, display: 'inline-block', width: 110 }}>web</span>
                    <span style={{ color: theme.neon.cyan }}>{basics.url}</span>
                  </li>
                )}
                {basics.profiles.slice(0, 2).map((p, i) => (
                  <li key={i} style={{ fontSize: 24, color: theme.terminal.fg }}>
                    <span style={{ color: theme.terminal.fgDim, display: 'inline-block', width: 110 }}>
                      {p.network.toLowerCase()}
                    </span>
                    <span style={{ color: theme.neon.cyan }}>{p.username}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 简化二维码占位：8x8 网格根据 qrPayload 哈希生成 + 描边动画 */}
            <div style={{ width: 280, height: 280, position: 'relative' }}>
              <svg viewBox="0 0 320 320" width={280} height={280}>
                <rect width={320} height={320} fill={theme.terminal.bg} />
                {generateQRGrid(qrPayload).map((row, y) =>
                  row.map((on, x) =>
                    on
                      ? (
                          <rect
                            key={`${x}-${y}`}
                            x={x * 40}
                            y={y * 40}
                            width={40}
                            height={40}
                            fill={theme.neon.cyan}
                          />
                        )
                      : null,
                  ),
                )}
                <rect
                  x={2}
                  y={2}
                  width={316}
                  height={316}
                  fill="none"
                  stroke={theme.neon.cyan}
                  strokeWidth={4}
                  strokeDasharray={qrLength}
                  strokeDashoffset={qrDraw}
                />
              </svg>
            </div>
          </div>
        </div>
      </CRTFrame>
      <Scanlines opacity={0.5} />
    </AbsoluteFill>
  )
}

/**
 * 简化的「伪二维码」生成：基于 payload 字符串哈希得到 8x8 黑白网格。
 * 不是真二维码，纯视觉占位 —— 真实使用时可以接入 qrcode 库。
 */
function generateQRGrid(payload: string): boolean[][] {
  const size = 8
  const grid: boolean[][] = Array.from({ length: size }, () => Array.from({ length: size }, () => false))
  let h = 5381
  for (let i = 0; i < payload.length; i++)
    h = (h * 33) ^ payload.charCodeAt(i)

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      h = (h * 1664525 + 1013904223) >>> 0
      grid[y]![x] = (h & 1) === 1
    }
  }
  // 模拟左上、右上、左下定位标记
  for (const [px, py] of [[0, 0], [6, 0], [0, 6]] as const) {
    for (let dy = 0; dy < 2; dy++)
      for (let dx = 0; dx < 2; dx++)
        grid[py + dy]![px + dx] = true
  }
  return grid
}
