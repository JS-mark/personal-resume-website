import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export interface RevealProps {
  children: ReactNode
  /** 进入视口的延迟（秒），用来错开多个元素 */
  delay?: number
  /** 入场偏移距离（向上滑动 px），默认 24 */
  y?: number
  /** 触发后是否只播一次（默认 true，避免反复打扰）；视频自身已有滚回重播逻辑 */
  once?: boolean
  /** 多少比例进入视口才触发（0~1，默认 0.2）*/
  amount?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'article'
}

/**
 * Apple 风滚动入场：淡入 + 向上滑动。
 * 用 cubic-bezier(0.22, 1, 0.36, 1)（"easeOutExpo" 类似）让收尾更柔和。
 * prefers-reduced-motion 时直接显示，不做动画。
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  once = true,
  amount = 0.2,
  className,
  as = 'div',
}: RevealProps) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as]

  if (reduce) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}
