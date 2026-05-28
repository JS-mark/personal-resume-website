import type { ReactNode } from 'react'

export interface TagProps {
  variant?: 'cyan' | 'magenta' | 'green' | 'purple' | 'yellow' | 'muted'
  children: ReactNode
  className?: string
}

const variantClass: Record<NonNullable<TagProps['variant']>, string> = {
  cyan: 'border-neon-cyan/40 text-neon-cyan',
  magenta: 'border-neon-magenta/40 text-neon-magenta',
  green: 'border-neon-green/40 text-neon-green',
  purple: 'border-neon-purple/40 text-neon-purple',
  yellow: 'border-neon-yellow/40 text-neon-yellow',
  muted: 'border-terminal-border text-terminal-fgDim',
}

export function Tag({ variant = 'cyan', children, className = '' }: TagProps) {
  return (
    <span
      className={`inline-flex items-center border bg-terminal-bgAlt/60 px-2 py-0.5 font-mono text-xs ${variantClass[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
