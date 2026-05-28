import type { ContactCardProps } from './schema'
import { localize } from '@resume/data'
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { ensureFonts, fontFamily } from '../../fonts'
import { CRTFrame } from '../../layers/CRTFrame'
import { Scanlines } from '../../layers/Scanlines'
import { theme } from '../../theme'
import { LottieCat } from './LottieCat'

ensureFonts()

/** 名片 Y 轴翻转 + 霓虹猫宠物动画 */
export function ContactCard({ basics, locale }: ContactCardProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const flipProgress = spring({ frame: frame - 10, fps, config: { damping: 18, stiffness: 80 } })
  const rotateY = interpolate(flipProgress, [0, 1], [180, 0])

  // 阴影呼吸：基础发光 + 一个 ~2.5s 周期的强度浮动
  const glowPulse = (Math.sin((frame / fps) * 2.2) + 1) / 2 // 0..1
  const glowSpread = 32 + glowPulse * 18
  const glowAlpha = 0.32 + glowPulse * 0.18
  const catOpacity = interpolate(frame, [30, 80], [0, 1], {
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
                {basics.profiles.slice(0, 2).map(p => (
                  <li key={p.network} style={{ fontSize: 24, color: theme.terminal.fg }}>
                    <span style={{ color: theme.terminal.fgDim, display: 'inline-block', width: 110 }}>
                      {p.network.toLowerCase()}
                    </span>
                    <span style={{ color: theme.neon.cyan }}>{p.username}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lottie 宠物：圆形遮罩 + 霓虹呼吸阴影 */}
            <div
              style={{
                width: 280,
                height: 280,
                position: 'relative',
                opacity: catOpacity,
                borderRadius: '50%',
                boxShadow: `0 0 ${glowSpread}px rgba(0,245,255,${glowAlpha}), 0 0 ${glowSpread * 1.8}px rgba(0,245,255,${glowAlpha * 0.4})`,
              }}
            >
              <LottieCat size={280} />
            </div>
          </div>
        </div>
      </CRTFrame>
      <Scanlines opacity={0.5} />
    </AbsoluteFill>
  )
}
