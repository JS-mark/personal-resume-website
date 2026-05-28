import type { ReactNode } from 'react'

export interface GlitchTextProps {
  text: string
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  children?: ReactNode
}

/**
 * 故障字效果——通过 ::before / ::after 双层位移模拟 RGB 分离。
 * 实际样式定义在 index.css 的 .glitch-text 工具类中。
 */
export function GlitchText({
  text,
  as: Tag = 'span',
  className = '',
  children,
}: GlitchTextProps) {
  return (
    <Tag className={`glitch-text ${className}`} data-text={text}>
      {children ?? text}
    </Tag>
  )
}
