import { AbsoluteFill } from 'remotion'
import { ensureFonts } from '../../fonts'
import { CRTFrame } from '../../layers/CRTFrame'
import { MatrixRain } from '../../layers/MatrixRain'
import { Scanlines } from '../../layers/Scanlines'
import { theme } from '../../theme'
import type { HeroIntroProps } from './schema'
import { TerminalTyping } from './scenes/TerminalTyping'

ensureFonts()

export function HeroIntro(props: HeroIntroProps) {
  return (
    <AbsoluteFill style={{ backgroundColor: theme.terminal.bg }}>
      <MatrixRain opacity={0.18} />
      <CRTFrame>
        <TerminalTyping {...props} />
      </CRTFrame>
      <Scanlines opacity={0.55} />
    </AbsoluteFill>
  )
}
