import type { Locale, Skill } from '@resume/data'
import { skillLevelLabel } from '@resume/data'
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { fontFamily } from '../../../fonts'
import { theme } from '../../../theme'

interface BarsSceneProps {
  skills: Skill[]
  locale: Locale
}

/** 横向 bars 布局：每条技能一行，进度条 spring 填充 + 数值打字 */
export function BarsScene({ skills, locale }: BarsSceneProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <div
      style={{
        fontFamily,
        padding: 80,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        justifyContent: 'center',
      }}
    >
      <h2
        style={{
          fontSize: 48,
          fontWeight: 700,
          color: theme.neon.cyan,
          marginBottom: 24,
          textShadow: '0 0 12px rgba(0,245,255,0.5)',
        }}
      >
        $ ls ./skills
      </h2>
      {skills.slice(0, 8).map((skill, i) => {
        const startFrame = 12 + i * 8
        const progress = spring({
          frame: frame - startFrame,
          fps,
          config: { damping: 14, stiffness: 90 },
        })
        const fillRatio = (skill.level / 5) * progress
        const opacity = interpolate(frame, [startFrame, startFrame + 6], [0, 1], { extrapolateRight: 'clamp' })

        return (
          <div key={skill.name} style={{ opacity, display: 'flex', alignItems: 'center', gap: 24 }}>
            <span style={{ fontSize: 28, color: theme.terminal.fg, width: 280 }}>{skill.name}</span>
            <div
              style={{
                flex: 1,
                height: 24,
                background: theme.terminal.border,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${fillRatio * 100}%`,
                  height: '100%',
                  background: skill.level >= 4 ? theme.neon.cyan : theme.neon.magenta,
                  boxShadow: `0 0 16px ${skill.level >= 4 ? theme.neon.cyan : theme.neon.magenta}`,
                }}
              />
            </div>
            <div
              style={{
                width: 320,
                textAlign: 'right',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: 4,
                lineHeight: 1.1,
              }}
            >
              <span style={{ fontSize: 36, color: theme.neon.cyan, fontWeight: 700, letterSpacing: '0.04em' }}>
                {skillLevelLabel(skill.level, locale)}
              </span>
              {skill.yearsExperience && (
                <span style={{ fontSize: 24, color: theme.terminal.fgDim }}>
                  {locale === 'zh' ? `${skill.yearsExperience} 年经验` : `${skill.yearsExperience} yrs exp`}
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
