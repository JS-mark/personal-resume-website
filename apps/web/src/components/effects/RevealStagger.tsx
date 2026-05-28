import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export interface RevealStaggerProps {
  children: ReactNode
  /** 子元素之间的错开间隔（秒），默认 0.06 */
  stagger?: number
  /** 整组开始前的延迟（秒）*/
  delayChildren?: number
  /** 多少比例进入视口才触发（0~1）*/
  amount?: number
  once?: boolean
  className?: string
  as?: 'ul' | 'ol' | 'div'
}

export interface RevealItemProps {
  children: ReactNode
  className?: string
  as?: 'li' | 'div'
  y?: number
}

/**
 * 容器 + 子项 stagger 入场动画。
 * 与 Reveal 区别：Reveal 是单个元素；RevealStagger 是父容器配合 RevealItem 让一组列表元素错开依次进入。
 *
 * @example
 * <RevealStagger as="ul">
 *   {items.map(it => <RevealItem key={it.id} as="li">...</RevealItem>)}
 * </RevealStagger>
 */
export function RevealStagger({
  children,
  stagger = 0.06,
  delayChildren = 0,
  amount = 0.15,
  once = true,
  className,
  as = 'div',
}: RevealStaggerProps) {
  const reduce = useReducedMotion()
  if (reduce) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </MotionTag>
  )
}

export function RevealItem({ children, className, as = 'div', y = 20 }: RevealItemProps) {
  const reduce = useReducedMotion()
  if (reduce) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </MotionTag>
  )
}
