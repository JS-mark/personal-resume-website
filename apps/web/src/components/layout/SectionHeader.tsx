import type { ReactNode } from 'react'
import { Reveal } from '@/components/effects/Reveal'

export interface SectionHeaderProps {
  /** 区块 id，供 NavCommands 锚点滚动使用 */
  id: string
  /** 区块标题，例如 '// skills.render()' */
  title: string
  /** 终端命令提示，例如 '$ ls ./skills' */
  command?: string
  children?: ReactNode
}

/**
 * 各 Section 的共用标题块，确保视觉节奏一致。
 * 用 Reveal 实现入场淡入 + 上滑。
 */
export function SectionHeader({ id, title, command, children }: SectionHeaderProps) {
  return (
    <Reveal as="div" className="mb-8 flex flex-col gap-2">
      <header className="flex flex-col gap-2" id={`${id}-header`}>
        {command && (
          <p className="font-mono text-xs text-terminal-fgDim">
            <span className="text-status-success">$</span>
            {' '}
            {command.replace(/^\$\s*/, '')}
          </p>
        )}
        <h2 className="font-mono text-2xl font-bold text-neon-cyan text-glow-cyan md:text-3xl">
          {title}
        </h2>
        {children}
      </header>
    </Reveal>
  )
}
