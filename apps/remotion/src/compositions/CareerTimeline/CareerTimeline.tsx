import type { CareerTimelineProps } from './schema'
import { formatYearMonth, localize } from '@resume/data'
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { ensureFonts, fontFamily } from '../../fonts'
import { NeonGrid } from '../../layers/NeonGrid'
import { Scanlines } from '../../layers/Scanlines'
import { theme } from '../../theme'

ensureFonts()

export function CareerTimeline({ work, locale }: CareerTimelineProps) {
  const frame = useCurrentFrame()
  const { fps, width } = useVideoConfig()

  const sortedWork = [...work].sort((a, b) => a.startDate.localeCompare(b.startDate))
  const slotWidth = 480
  const totalWidth = sortedWork.length * slotWidth + 200
  const scrollX = interpolate(frame, [60, 540], [0, Math.max(0, totalWidth - width + 200)])

  const titleOpacity = interpolate(frame, [0, 24], [0, 1], { extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill style={{ backgroundColor: theme.terminal.bg, fontFamily }}>
      <NeonGrid opacity={0.2} />

      <h1
        style={{
          padding: '60px 80px 0',
          fontSize: 56,
          color: theme.neon.cyan,
          textShadow: '0 0 16px rgba(0,245,255,0.5)',
          opacity: titleOpacity,
        }}
      >
        $ git log --oneline ./career
      </h1>

      <AbsoluteFill style={{ top: 220 }}>
        <div
          style={{
            position: 'relative',
            transform: `translateX(${-scrollX}px)`,
            paddingLeft: 80,
            paddingTop: 80,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 200,
              left: 80,
              width: totalWidth,
              height: 2,
              background: theme.neon.cyan,
              opacity: 0.6,
              boxShadow: `0 0 12px ${theme.neon.cyan}`,
            }}
          />
          <div style={{ display: 'flex', gap: 0, paddingLeft: 0 }}>
            {sortedWork.map((item, i) => {
              const startFrame = 80 + i * 40
              const reveal = spring({
                frame: frame - startFrame,
                fps,
                config: { damping: 14, stiffness: 90 },
              })
              return (
                <div
                  key={`${item.startDate}-${item.name.zh}`}
                  style={{
                    width: slotWidth,
                    flexShrink: 0,
                    opacity: reveal,
                    transform: `translateY(${(1 - reveal) * 30}px)`,
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      width: 16,
                      height: 16,
                      background: theme.neon.cyan,
                      borderRadius: '50%',
                      marginTop: 192,
                      marginLeft: 32,
                      boxShadow: `0 0 16px ${theme.neon.cyan}`,
                    }}
                  />
                  <div style={{ marginTop: 32, paddingRight: 64 }}>
                    <p style={{ fontSize: 22, color: theme.terminal.fgDim }}>
                      {formatYearMonth(item.startDate, locale)}
                      {' — '}
                      {item.endDate ? formatYearMonth(item.endDate, locale) : 'present'}
                    </p>
                    <p
                      style={{
                        fontSize: 36,
                        color: theme.neon.cyan,
                        marginTop: 8,
                        fontWeight: 700,
                      }}
                    >
                      {localize(item.position, locale)}
                    </p>
                    <p style={{ fontSize: 28, color: theme.neon.magenta, marginTop: 4 }}>
                      @
                      {' '}
                      {localize(item.name, locale)}
                    </p>
                    <p
                      style={{
                        fontSize: 20,
                        color: theme.terminal.fg,
                        marginTop: 16,
                        lineHeight: 1.5,
                      }}
                    >
                      {localize(item.summary, locale)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </AbsoluteFill>

      <Scanlines opacity={0.4} />
    </AbsoluteFill>
  )
}
