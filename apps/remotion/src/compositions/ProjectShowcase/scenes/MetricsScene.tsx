import type { ProjectItem } from '@resume/data'
import { localize } from '@resume/data'
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { fontFamily } from '../../../fonts'
import { theme } from '../../../theme'

interface MetricsSceneProps {
  project: ProjectItem
  locale: 'zh' | 'en'
}

/**
 * 数据指标卡片：依次弹入 + 数值 count-up + 增量提示渐入。
 * 内部使用 Sequence 相对帧（0 开始）。
 */
export function MetricsScene({ project, locale }: MetricsSceneProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const total = 180

  const titleOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' })
  const sceneOut = interpolate(frame, [total - 18, total], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const metrics = project.metrics ?? []

  return (
    <div
      style={{
        fontFamily,
        padding: 80,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 56,
        opacity: sceneOut,
      }}
    >
      <div style={{ opacity: titleOpacity }}>
        <p style={{ fontSize: 22, color: theme.terminal.fgDim, marginBottom: 6 }}>$ ./benchmark.sh</p>
        <h2
          style={{
            fontSize: 56,
            color: theme.neon.cyan,
            fontWeight: 700,
            textShadow: '0 0 12px rgba(0,245,255,0.5)',
            lineHeight: 1.1,
          }}
        >
          {locale === 'zh' ? '关键成果' : 'Key Outcomes'}
        </h2>
      </div>

      <div style={{ display: 'flex', gap: 32, justifyContent: 'space-between' }}>
        {metrics.length === 0 && (
          <div style={{ color: theme.terminal.fgDim, fontSize: 24 }}>
            {locale === 'zh' ? '// 暂无 metrics' : '// no metrics yet'}
          </div>
        )}
        {metrics.map((metric, i) => {
          const cardStart = 18 + i * 18
          const scale = spring({
            frame: frame - cardStart,
            fps,
            config: { damping: 14, stiffness: 110 },
          })
          const labelOpacity = interpolate(frame, [cardStart + 12, cardStart + 28], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
          const numberProgress = spring({
            frame: frame - (cardStart + 8),
            fps,
            config: { damping: 20, stiffness: 70 },
          })
          const animatedValue = countUp(metric.value, numberProgress)

          return (
            <div
              key={metric.label.zh}
              style={{
                flex: 1,
                background: theme.terminal.bgPanel,
                border: `1px solid ${theme.neon.cyan}`,
                padding: 32,
                transform: `scale(${scale})`,
                transformOrigin: 'center',
                boxShadow: '0 0 24px rgba(0,245,255,0.25)',
              }}
            >
              <p style={{ fontSize: 20, color: theme.terminal.fgDim, opacity: labelOpacity }}>
                {localize(metric.label, locale)}
              </p>
              <p
                style={{
                  fontSize: 88,
                  fontWeight: 700,
                  color: theme.neon.cyan,
                  textShadow: '0 0 24px rgba(0,245,255,0.6)',
                  margin: '12px 0',
                  letterSpacing: '0.02em',
                }}
              >
                {animatedValue}
              </p>
              {metric.delta && (
                <p style={{ fontSize: 24, color: theme.status.success, opacity: labelOpacity }}>
                  {metric.delta}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/**
 * 把 metric.value 里的数字部分按 progress 比例渐变。
 * 例如 "520K" 在 progress=0.5 时显示 "260K"。
 * 没有数字时直接返回原字符串（如 "45ms" 也支持）。
 */
function countUp(value: string, progress: number): string {
  const match = value.match(/(-?\d+(?:\.\d+)?)/)
  if (!match)
    return value
  const num = Number(match[1])
  const animated = num * Math.min(1, Math.max(0, progress))
  const formatted = Number.isInteger(num) ? Math.round(animated).toString() : animated.toFixed(1)
  return value.replace(match[1]!, formatted)
}
