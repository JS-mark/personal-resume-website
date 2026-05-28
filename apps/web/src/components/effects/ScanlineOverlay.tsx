export interface ScanlineOverlayProps {
  className?: string
}

/**
 * 全屏扫描线/CRT 叠加层。纯 CSS（无 JS 开销）。
 * 调用方把它放在固定层（fixed inset-0 z-50）上即可。
 */
export function ScanlineOverlay({ className = '' }: ScanlineOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-40 ${className}`}
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px)',
        mixBlendMode: 'overlay',
      }}
    />
  )
}
