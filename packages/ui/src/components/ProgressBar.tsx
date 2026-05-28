export interface ProgressBarProps {
  /** 0-1 的填充进度 */
  value: number
  label?: string
  rightLabel?: string
  variant?: 'cyan' | 'magenta' | 'green' | 'purple' | 'yellow'
  /** 是否显示分段格子风格 */
  segmented?: boolean
  className?: string
}

const variantFg: Record<NonNullable<ProgressBarProps['variant']>, string> = {
  cyan: 'bg-neon-cyan shadow-neon-cyan',
  magenta: 'bg-neon-magenta shadow-neon-magenta',
  green: 'bg-neon-green shadow-neon-green',
  purple: 'bg-neon-purple shadow-neon-purple',
  yellow: 'bg-neon-yellow shadow-neon-yellow',
}

const variantText: Record<NonNullable<ProgressBarProps['variant']>, string> = {
  cyan: 'text-neon-cyan',
  magenta: 'text-neon-magenta',
  green: 'text-neon-green',
  purple: 'text-neon-purple',
  yellow: 'text-neon-yellow',
}

/**
 * 终端风进度条，支持纯填充与分段格子两种风格。
 */
export function ProgressBar({
  value,
  label,
  rightLabel,
  variant = 'cyan',
  segmented = false,
  className = '',
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(1, value))
  const percent = Math.round(clamped * 100)

  return (
    <div className={`font-mono text-xs ${className}`}>
      {(label || rightLabel) && (
        <div className="mb-1 flex justify-between">
          {label && <span className="text-terminal-fgDim">{label}</span>}
          {rightLabel && <span className={variantText[variant]}>{rightLabel}</span>}
        </div>
      )}
      {segmented
        ? (
            <div className="flex gap-px">
              {Array.from({ length: 20 }).map((_, i) => {
                const filled = i < Math.round(clamped * 20)
                return (
                  <span
                    key={i}
                    className={`h-3 flex-1 ${filled ? variantFg[variant] : 'bg-terminal-border'}`}
                  />
                )
              })}
            </div>
          )
        : (
            <div className="h-2 w-full overflow-hidden bg-terminal-border">
              <div
                className={`h-full transition-[width] duration-700 ${variantFg[variant]}`}
                style={{ width: `${percent}%` }}
              />
            </div>
          )}
    </div>
  )
}
