import type { ProjectItem } from '@resume/data'
import { localize } from '@resume/data'
import { interpolate, useCurrentFrame } from 'remotion'
import { fontFamily } from '../../../fonts'
import { theme } from '../../../theme'

interface CodeScanSceneProps {
  project: ProjectItem
  locale: 'zh' | 'en'
}

/**
 * 项目首屏：标题 + 副标题渐入，下方代码片段做"扫描线"高亮。
 * 内部使用 useCurrentFrame() 的 Sequence 相对帧（0 开始）。
 */
export function CodeScanScene({ project, locale }: CodeScanSceneProps) {
  const frame = useCurrentFrame()
  const total = 180

  const titleOpacity = interpolate(frame, [0, 24], [0, 1], { extrapolateRight: 'clamp' })
  const titleY = interpolate(frame, [0, 24], [12, 0], { extrapolateRight: 'clamp' })
  const taglineOpacity = interpolate(frame, [12, 36], [0, 1], { extrapolateRight: 'clamp' })

  const lines = project.codeSnippet?.code.split('\n') ?? ['// no snippet']
  const visibleLines = Math.min(lines.length, Math.floor((frame - 30) / 5))
  const scanY = interpolate(frame, [30, total - 12], [0, 100], { extrapolateRight: 'clamp' })
  const sceneOut = interpolate(frame, [total - 18, total], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  return (
    <div
      style={{
        fontFamily,
        padding: 80,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        opacity: sceneOut,
      }}
    >
      <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
        <p style={{ fontSize: 24, color: theme.terminal.fgDim, marginBottom: 8 }}>$ cat ./project.md</p>
        <h1
          style={{
            fontSize: 88,
            fontWeight: 700,
            color: theme.neon.cyan,
            textShadow: '0 0 16px rgba(0,245,255,0.5)',
            lineHeight: 1.1,
          }}
        >
          {localize(project.name, locale)}
        </h1>
        <p style={{ fontSize: 32, color: theme.neon.magenta, marginTop: 12, opacity: taglineOpacity }}>
          {localize(project.tagline, locale)}
        </p>
      </div>

      <div
        style={{
          flex: 1,
          background: theme.terminal.bgPanel,
          border: `1px solid ${theme.terminal.border}`,
          padding: 32,
          position: 'relative',
          overflow: 'hidden',
          marginTop: 12,
        }}
      >
        <pre
          style={{
            color: theme.neon.green,
            fontSize: 22,
            lineHeight: 1.6,
            margin: 0,
            fontFamily,
          }}
        >
          {lines.slice(0, visibleLines).join('\n')}
        </pre>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: `${scanY}%`,
            height: 2,
            background: theme.neon.cyan,
            boxShadow: `0 0 24px ${theme.neon.cyan}`,
          }}
        />
      </div>
    </div>
  )
}
