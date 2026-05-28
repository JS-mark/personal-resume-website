import { useEffect, useState } from 'react'

/**
 * 监听一组 section 元素，返回当前在视口"激活带"内的 section id。
 *
 * rootMargin 把激活带设为屏幕中部一窄条（顶部 30%、底部 60%），
 * 这样滚动时同一时刻只有一个 section 被认为是 active。
 */
export function useActiveSection(
  ids: readonly string[],
  options?: { rootMargin?: string },
): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null)

  useEffect(() => {
    if (ids.length === 0)
      return
    const els = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (els.length === 0)
      return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting)
            setActive(entry.target.id)
        }
      },
      {
        rootMargin: options?.rootMargin ?? '-30% 0px -60% 0px',
        threshold: 0,
      },
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [ids, options?.rootMargin])

  return active
}
