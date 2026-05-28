import type { ProjectItem } from '@resume/data'
import type { PanInfo } from 'framer-motion'
import { Tag } from '@resume/ui'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useLocalize } from '@/hooks/useLocalizedString'

type Position = 'active' | 'prev' | 'next' | 'hiddenLeft' | 'hiddenRight'

const variants: Record<Position, {
  scale: number
  x: string
  opacity: number
  zIndex: number
  filter: string
}> = {
  active: { scale: 1, x: '0%', opacity: 1, zIndex: 30, filter: 'blur(0px)' },
  next: { scale: 0.86, x: '32%', opacity: 0.45, zIndex: 20, filter: 'blur(1px)' },
  prev: { scale: 0.86, x: '-32%', opacity: 0.45, zIndex: 20, filter: 'blur(1px)' },
  hiddenRight: { scale: 0.7, x: '50%', opacity: 0, zIndex: 10, filter: 'blur(2px)' },
  hiddenLeft: { scale: 0.7, x: '-50%', opacity: 0, zIndex: 10, filter: 'blur(2px)' },
}

function getPosition(i: number, active: number, total: number): Position {
  const rel = ((i - active) % total + total) % total
  if (rel === 0)
    return 'active'
  if (rel === 1)
    return 'next'
  if (rel === total - 1)
    return 'prev'
  return rel < total / 2 ? 'hiddenRight' : 'hiddenLeft'
}

const DRAG_THRESHOLD = 80

export function ProjectStack({ items }: { items: readonly ProjectItem[] }) {
  const { t } = useTranslation()
  const localize = useLocalize()
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const total = items.length
  const titleId = useId()

  const advance = useCallback((step: number) => {
    setActive(prev => ((prev + step) % total + total) % total)
  }, [total])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest('input,textarea,[contenteditable="true"]'))
        return
      if (e.key === 'ArrowLeft')
        advance(-1)
      else if (e.key === 'ArrowRight')
        advance(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [advance])

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -DRAG_THRESHOLD)
      advance(1)
    else if (info.offset.x > DRAG_THRESHOLD)
      advance(-1)
  }

  // Reduced motion: 退化为简单网格，无动画无堆叠
  if (reduce) {
    return (
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {items.map(p => (
          <li
            key={p.slug}
            className="group relative flex flex-col border border-terminal-border bg-terminal-bgAlt/70 p-6 shadow-panel"
          >
            <ProjectCardBody project={p} localize={localize} viewDetails={t('projects.viewDetails')} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={titleId}
    >
      <span id={titleId} className="sr-only">
        {t('projects.title')}
      </span>

      <div className="relative mx-auto h-[20rem] w-full max-w-3xl overflow-hidden sm:h-[18rem]">
        <AnimatePresence initial={false}>
          {items.map((project, i) => {
            const pos = getPosition(i, active, total)
            const isActive = pos === 'active'
            return (
              <motion.div
                key={project.slug}
                className="absolute inset-x-0 top-0 mx-auto h-full w-[88%] sm:w-[78%]"
                animate={pos}
                variants={variants}
                initial={false}
                transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                style={{ touchAction: isActive ? 'pan-y' : 'auto' }}
                drag={isActive ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={onDragEnd}
                onClick={() => {
                  if (pos === 'next')
                    advance(1)
                  else if (pos === 'prev')
                    advance(-1)
                }}
                aria-hidden={!isActive}
                aria-roledescription="slide"
                aria-label={`${i + 1} / ${total}`}
              >
                <article
                  className={`flex h-full flex-col border bg-terminal-bgAlt/85 p-6 shadow-panel transition-colors ${
                    isActive
                      ? 'border-neon-cyan shadow-neon-cyan'
                      : 'border-terminal-border'
                  } ${isActive ? '' : 'cursor-pointer'}`}
                >
                  <ProjectCardBody
                    project={project}
                    localize={localize}
                    viewDetails={t('projects.viewDetails')}
                    interactive={isActive}
                  />
                </article>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Edge fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-40 w-12 bg-gradient-to-r from-terminal-bg to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-40 w-12 bg-gradient-to-l from-terminal-bg to-transparent sm:w-20" />

      {/* Arrow controls */}
      <button
        type="button"
        onClick={() => advance(-1)}
        aria-label={t('projects.previous')}
        className="absolute left-1 top-1/2 z-50 -translate-y-1/2 border border-terminal-border bg-terminal-bg/80 p-2 text-terminal-fgDim backdrop-blur transition hover:border-neon-cyan hover:text-neon-cyan focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neon-cyan sm:left-3"
      >
        <ChevronLeft className="size-4" />
      </button>
      <button
        type="button"
        onClick={() => advance(1)}
        aria-label={t('projects.next')}
        className="absolute right-1 top-1/2 z-50 -translate-y-1/2 border border-terminal-border bg-terminal-bg/80 p-2 text-terminal-fgDim backdrop-blur transition hover:border-neon-cyan hover:text-neon-cyan focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neon-cyan sm:right-3"
      >
        <ChevronRight className="size-4" />
      </button>

      {/* Indicator dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {items.map((p, i) => {
          const isActive = i === active
          return (
            <button
              type="button"
              key={p.slug}
              onClick={() => setActive(i)}
              aria-label={t('projects.gotoSlide', { n: i + 1 })}
              aria-current={isActive}
              className={`h-1.5 rounded-full transition-all ${
                isActive ? 'w-8 bg-neon-cyan shadow-neon-cyan' : 'w-3 bg-terminal-border hover:bg-terminal-fgDim'
              }`}
            />
          )
        })}
      </div>
    </div>
  )
}

function ProjectCardBody({
  project,
  localize,
  viewDetails,
  interactive = true,
}: {
  project: ProjectItem
  localize: (s: { zh: string, en: string }) => string
  viewDetails: string
  interactive?: boolean
}) {
  return (
    <>
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="font-mono text-lg leading-tight text-neon-cyan">
          {localize(project.name)}
        </h3>
        <Link
          to={`/projects/${project.slug}`}
          tabIndex={interactive ? 0 : -1}
          className="inline-flex shrink-0 items-center gap-1 font-mono text-xs text-terminal-fgDim transition hover:text-neon-cyan"
          onClick={e => e.stopPropagation()}
        >
          {viewDetails}
          <ArrowUpRight className="size-3" />
        </Link>
      </div>
      <p className="mb-4 line-clamp-3 font-mono text-sm leading-relaxed text-terminal-fg">
        {localize(project.tagline)}
      </p>
      <div className="mt-auto flex flex-wrap gap-1.5">
        {project.techStack.slice(0, 6).map(tech => (
          <Tag key={tech} variant="muted">
            {tech}
          </Tag>
        ))}
      </div>
    </>
  )
}
