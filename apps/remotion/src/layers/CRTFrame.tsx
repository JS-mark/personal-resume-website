import type { ReactNode } from 'react'
import { AbsoluteFill, useCurrentFrame } from 'remotion'
import { theme } from '../theme'

interface CRTFrameProps {
  children: ReactNode
}

/**
 * 模拟 CRT 显示器外框 + 微弱呼吸闪烁。
 */
export function CRTFrame({ children }: CRTFrameProps) {
  const frame = useCurrentFrame()
  const flicker = 0.96 + Math.sin(frame * 0.6) * 0.04

  return (
    <AbsoluteFill style={{ opacity: flicker }}>
      <AbsoluteFill
        style={{
          padding: 80,
        }}
      >
        <div
          style={{
            flex: 1,
            border: `1px solid ${theme.terminal.border}`,
            boxShadow: `inset 0 0 120px rgba(0, 245, 255, 0.08), 0 0 0 1px rgba(0, 245, 255, 0.18)`,
            background: 'rgba(15, 15, 20, 0.65)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {children}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  )
}
