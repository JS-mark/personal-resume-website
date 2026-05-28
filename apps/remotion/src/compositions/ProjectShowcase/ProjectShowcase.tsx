import { AbsoluteFill, Sequence } from 'remotion'
import { ensureFonts } from '../../fonts'
import { MatrixRain } from '../../layers/MatrixRain'
import { Scanlines } from '../../layers/Scanlines'
import { theme } from '../../theme'
import type { ProjectShowcaseProps } from './schema'
import { ArchDiagramScene } from './scenes/ArchDiagramScene'
import { CodeScanScene } from './scenes/CodeScanScene'
import { MetricsScene } from './scenes/MetricsScene'

ensureFonts()

/**
 * 三段式项目展示视频，总时长 600f @30fps = 20s。
 * 每个 scene 内部使用 Sequence 相对帧（useCurrentFrame() 从 0 开始），
 * 自带 in/out 透明度过渡，避免硬切。
 *
 * - 0~6s   CodeScan   项目名/标语 + 代码片段扫描线高亮
 * - 6~14s  ArchDiagram 架构图节点 + 连线动画
 * - 14~20s Metrics    指标卡片弹入 + 数字 count-up
 */
export function ProjectShowcase({ project, locale }: ProjectShowcaseProps) {
  return (
    <AbsoluteFill style={{ backgroundColor: theme.terminal.bg }}>
      <MatrixRain opacity={0.1} />

      <Sequence from={0} durationInFrames={180}>
        <CodeScanScene project={project} locale={locale} />
      </Sequence>

      <Sequence from={180} durationInFrames={240}>
        <ArchDiagramScene project={project} locale={locale} />
      </Sequence>

      <Sequence from={420} durationInFrames={180}>
        <MetricsScene project={project} locale={locale} />
      </Sequence>

      <Scanlines opacity={0.45} />
    </AbsoluteFill>
  )
}
