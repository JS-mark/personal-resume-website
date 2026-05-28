import { AbsoluteFill } from 'remotion'
import { ensureFonts } from '../../fonts'
import { NeonGrid } from '../../layers/NeonGrid'
import { Scanlines } from '../../layers/Scanlines'
import { theme } from '../../theme'
import { BarsScene } from './scenes/BarsScene'
import type { SkillsShowcaseProps } from './schema'

ensureFonts()

export function SkillsShowcase({ skills, locale }: SkillsShowcaseProps) {
  // 当前版本：所有 layout 共用 BarsScene；后续可按 layout 切 scene
  return (
    <AbsoluteFill style={{ backgroundColor: theme.terminal.bg }}>
      <NeonGrid opacity={0.22} />
      <BarsScene skills={skills} locale={locale} />
      <Scanlines opacity={0.4} />
    </AbsoluteFill>
  )
}
