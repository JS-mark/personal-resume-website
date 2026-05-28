import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'cyan' | 'magenta' | 'ghost'
  size?: 'sm' | 'md'
  children: ReactNode
}

const variantClass: Record<NonNullable<NeonButtonProps['variant']>, string> = {
  cyan: 'border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 hover:shadow-neon-cyan',
  magenta: 'border-neon-magenta text-neon-magenta hover:bg-neon-magenta/10 hover:shadow-neon-magenta',
  ghost: 'border-terminal-border text-terminal-fg hover:border-neon-cyan hover:text-neon-cyan',
}

const sizeClass: Record<NonNullable<NeonButtonProps['size']>, string> = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-2 text-sm',
}

export function NeonButton({
  variant = 'cyan',
  size = 'md',
  className = '',
  children,
  ...rest
}: NeonButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-2 border bg-transparent font-mono uppercase tracking-wider transition focus:outline-none focus-visible:ring-1 focus-visible:ring-neon-cyan ${variantClass[variant]} ${sizeClass[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
