import type { HeroIntroProps } from '../schema'
import { localize } from '@resume/data'
import { interpolate, useCurrentFrame } from 'remotion'
import { fontFamily } from '../../../fonts'
import { theme } from '../../../theme'

/**
 * `$ whoami` 终端打字效果：
 * - 0~30f：command 提示
 * - 30~80f：name 逐字打字
 * - 100f~：tagline 逐条出现
 */
const PROMPT = '$ whoami'

export function TerminalTyping({ name, taglines, locale }: HeroIntroProps) {
  const frame = useCurrentFrame()

  const promptCharsShown = Math.min(PROMPT.length, Math.floor(frame / 1.5))
  const promptText = PROMPT.slice(0, promptCharsShown)

  const nameStartFrame = 30
  const nameCharsShown = Math.max(0, Math.min(name.length, Math.floor((frame - nameStartFrame) / 2)))
  const nameText = name.slice(0, nameCharsShown)

  const cursorOn = Math.floor(frame / 15) % 2 === 0

  return (
    <div
      style={{
        fontFamily,
        padding: 80,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 24,
      }}
    >
      <div style={{ fontSize: 36, color: theme.terminal.fgDim }}>
        <span style={{ color: theme.status.success }}>{promptText}</span>
        {promptCharsShown < PROMPT.length && cursorOn && (
          <span style={{ color: theme.neon.cyan }}>▮</span>
        )}
      </div>

      {frame > nameStartFrame && (
        <div
          style={{
            fontSize: 144,
            fontWeight: 700,
            color: theme.neon.cyan,
            textShadow: '0 0 16px rgba(0,245,255,0.6), 0 0 48px rgba(0,245,255,0.3)',
          }}
        >
          &gt;
          {' '}
          {nameText}
          {cursorOn && nameCharsShown < name.length && (
            <span style={{ display: 'inline-block', width: '0.5em', background: theme.neon.cyan, marginLeft: 8, height: '0.9em', verticalAlign: 'middle' }} />
          )}
        </div>
      )}

      {taglines.map((tagline, i) => {
        const startFrame = 100 + i * 50
        if (frame < startFrame)
          return null
        const text = localize(tagline, locale)
        const charsShown = Math.min(text.length, Math.floor((frame - startFrame) / 1.2))
        const opacity = interpolate(frame, [startFrame, startFrame + 12], [0, 1], { extrapolateRight: 'clamp' })

        return (
          <div
            key={tagline.zh}
            style={{
              fontSize: 42,
              color: theme.neon.magenta,
              textShadow: '0 0 12px rgba(255,0,170,0.55)',
              opacity,
            }}
          >
            {text.slice(0, charsShown)}
          </div>
        )
      })}
    </div>
  )
}
