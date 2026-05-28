import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export interface MatrixRainCanvasProps {
  /** 0~1，整体不透明度 */
  opacity?: number
  /** 字符落下速度系数，默认 1 */
  speed?: number
  className?: string
}

/**
 * Canvas2D 实现的矩阵雨背景。
 * 大段绝对定位的全屏背景元素 —— 调用方需把它包在 relative 容器内或自己设 fixed/absolute。
 */
export function MatrixRainCanvas({
  opacity = 0.08,
  speed = 1,
  className = '',
}: MatrixRainCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced)
      return
    const canvas = canvasRef.current
    if (!canvas)
      return
    const ctx = canvas.getContext('2d')
    if (!ctx)
      return

    let width = 0
    let height = 0
    let columnCount = 0
    let drops: number[] = []
    const fontSize = 14
    const chars = '01ABCDEFｱｲｳｴｵｶｷｸｹｺ<>{}[]/\\$#'.split('')
    let raf = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
      columnCount = Math.floor(width / fontSize)
      drops = Array.from({ length: columnCount }, () => Math.floor(Math.random() * -50))
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.08)'
      ctx.fillRect(0, 0, width, height)
      ctx.font = `${fontSize}px "JetBrains Mono", ui-monospace, monospace`
      ctx.fillStyle = '#00f5ff'
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        const y = drops[i]! * fontSize
        ctx.fillText(ch ?? '0', x, y)
        if (y > height && Math.random() > 0.975)
          drops[i] = 0
        else
          drops[i] = (drops[i] ?? 0) + speed
      }
      raf = window.requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [reduced, speed])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none size-full ${className}`}
      style={{ opacity }}
    />
  )
}
