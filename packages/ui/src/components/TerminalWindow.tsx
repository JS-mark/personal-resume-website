import type { ReactNode } from 'react'

export interface TerminalWindowProps {
  /** 窗口标题栏文本，例如 'mark@resume:~/about' */
  title?: string
  /** 是否显示左上角 macOS 式三色控制点 */
  showControls?: boolean
  /** 紧凑模式：减小内边距 */
  compact?: boolean
  className?: string
  children: ReactNode
}

/**
 * 通用「终端窗口」容器，跨网站和 Remotion 复用。
 * 仅依赖 Tailwind 类，不引入额外运行时。
 */
export function TerminalWindow({
  title = '~',
  showControls = true,
  compact = false,
  className = '',
  children,
}: TerminalWindowProps) {
  return (
    <div
      className={`relative overflow-hidden border border-terminal-border bg-terminal-bgAlt font-mono text-terminal-fg shadow-panel ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-terminal-border bg-terminal-bgPanel px-4 py-2">
        {showControls && (
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-status-error/80" />
            <span className="size-2.5 rounded-full bg-status-warning/80" />
            <span className="size-2.5 rounded-full bg-status-success/80" />
          </div>
        )}
        <span className="text-xs text-terminal-fgDim">{title}</span>
      </div>
      <div className={compact ? 'p-3' : 'p-6'}>{children}</div>
    </div>
  )
}
