import { AbsoluteFill } from 'remotion'

/** 远处的赛博朋克霓虹网格，作为 Skills/Timeline 等场景的背景。 */
export function NeonGrid({ opacity = 0.18 }: { opacity?: number }) {
  return (
    <AbsoluteFill
      style={{
        opacity,
        pointerEvents: 'none',
        backgroundImage:
          'linear-gradient(rgba(0,245,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.18) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        backgroundPosition: 'center',
        maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.9), transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.9), transparent 75%)',
      }}
    />
  )
}
