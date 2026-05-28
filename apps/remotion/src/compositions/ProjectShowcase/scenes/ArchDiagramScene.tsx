import type { ProjectItem } from '@resume/data'
import { localize } from '@resume/data'
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { fontFamily } from '../../../fonts'
import { theme } from '../../../theme'

interface ArchDiagramSceneProps {
  project: ProjectItem
  locale: 'zh' | 'en'
}

/**
 * 架构图：节点 spring 弹出 + 连线沿路径动态描边。
 * 内部使用 Sequence 相对帧（0 开始）。
 */
export function ArchDiagramScene({ project, locale }: ArchDiagramSceneProps) {
  const frame = useCurrentFrame()
  const { fps, width, height } = useVideoConfig()
  const total = 240

  // 用一个内部坐标系（1920×900 留出标题 180）来定位节点，避免节点被标题压住
  const canvasW = width
  const canvasH = height - 220
  const canvasOffsetY = 200

  const sceneIn = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' })
  const sceneOut = interpolate(frame, [total - 18, total], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const sceneOpacity = sceneIn * sceneOut

  const diagram = project.archDiagram

  return (
    <div style={{ fontFamily, height: '100%', position: 'relative', opacity: sceneOpacity }}>
      <div style={{ padding: '60px 80px 0' }}>
        <p style={{ fontSize: 22, color: theme.terminal.fgDim, marginBottom: 6 }}>$ tree ./architecture</p>
        <h2
          style={{
            fontSize: 56,
            color: theme.neon.cyan,
            fontWeight: 700,
            textShadow: '0 0 12px rgba(0,245,255,0.5)',
            lineHeight: 1.1,
          }}
        >
          {localize(project.name, locale)}
        </h2>
      </div>

      {diagram
        ? (
            <svg
              width={canvasW}
              height={canvasH}
              viewBox={`0 0 ${canvasW} ${canvasH}`}
              style={{ position: 'absolute', left: 0, top: canvasOffsetY, pointerEvents: 'none' }}
            >
              {diagram.edges.map((edge, i) => {
                const from = diagram.nodes.find(n => n.id === edge.from)
                const to = diagram.nodes.find(n => n.id === edge.to)
                if (!from || !to)
                  return null
                const fx = (from.x ?? 0.5) * canvasW
                const fy = (from.y ?? 0.5) * canvasH
                const tx = (to.x ?? 0.5) * canvasW
                const ty = (to.y ?? 0.5) * canvasH
                const edgeStart = 40 + i * 8
                const progress = spring({
                  frame: frame - edgeStart,
                  fps,
                  config: { damping: 18, stiffness: 60 },
                })
                const cx = fx + (tx - fx) * progress
                const cy = fy + (ty - fy) * progress
                return (
                  <g key={i}>
                    <line x1={fx} y1={fy} x2={tx} y2={ty} stroke={theme.terminal.border} strokeWidth={1} opacity={0.4 * progress} />
                    <line
                      x1={fx}
                      y1={fy}
                      x2={cx}
                      y2={cy}
                      stroke={theme.neon.cyan}
                      strokeWidth={2}
                      strokeDasharray="6 6"
                      opacity={0.85}
                    />
                  </g>
                )
              })}
              {diagram.nodes.map((node, i) => {
                const cx = (node.x ?? 0.5) * canvasW
                const cy = (node.y ?? 0.5) * canvasH
                const nodeStart = 12 + i * 10
                const scale = spring({
                  frame: frame - nodeStart,
                  fps,
                  config: { damping: 12, stiffness: 120 },
                })
                const labelOpacity = interpolate(frame, [nodeStart + 8, nodeStart + 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
                return (
                  <g key={node.id} transform={`translate(${cx}, ${cy}) scale(${scale})`}>
                    <rect
                      x={-110}
                      y={-36}
                      width={220}
                      height={72}
                      rx={4}
                      fill={theme.terminal.bgPanel}
                      stroke={theme.neon.cyan}
                      strokeWidth={2}
                    />
                    <text
                      x={0}
                      y={8}
                      textAnchor="middle"
                      fill={theme.neon.cyan}
                      fontFamily={fontFamily}
                      fontSize={24}
                      fontWeight={600}
                      opacity={labelOpacity}
                    >
                      {node.label}
                    </text>
                  </g>
                )
              })}
            </svg>
          )
        : (
            <div style={{ padding: 80, color: theme.terminal.fgDim, fontSize: 24 }}>
              {locale === 'zh' ? '// 架构图暂未提供' : '// no architecture diagram available'}
            </div>
          )}
    </div>
  )
}
