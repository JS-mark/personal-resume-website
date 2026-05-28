import { useEffect, useState } from 'react'
import { LocaleSwitcher } from '@/components/locale/LocaleSwitcher'

/** 顶部状态栏：终端 chrome 的最上方一行 */
export function StatusBar() {
  const [time, setTime] = useState(() => formatTime(new Date()))

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(new Date())), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex h-8 shrink-0 items-center justify-between border-b border-terminal-border bg-terminal-bgPanel px-4 font-mono text-xs">
      <div className="flex items-center gap-4 text-terminal-fgDim">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-status-error/80" />
          <span className="size-2 rounded-full bg-status-warning/80" />
          <span className="size-2 rounded-full bg-status-success/80" />
        </div>
        <span>~/resume</span>
        <span className="text-terminal-border">·</span>
        <span className="text-neon-cyan">main</span>
      </div>
      <div className="flex items-center gap-3">
        <LocaleSwitcher />
        <span className="text-terminal-border">|</span>
        <span className="hidden sm:inline text-status-success">● LIVE</span>
        <span className="text-terminal-fgDim">{time}</span>
      </div>
    </div>
  )
}

function formatTime(d: Date) {
  return d.toTimeString().slice(0, 8)
}
