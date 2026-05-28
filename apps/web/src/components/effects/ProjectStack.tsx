import type { ProjectItem } from '@resume/data'
import type { PanInfo } from 'framer-motion'
import { Tag } from '@resume/ui'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useLocalize } from '@/hooks/useLocalizedString'

type Position = 'active' | 'behind1' | 'behind2' | 'hidden'

// 堆叠：所有卡居中，往后的卡向下偏 + 缩小 + 半透，像一摞扑克牌的厚度
const variants: Record<Position, {
  scale: number
  y: number
  opacity: number
  zIndex: number
}> = {
  active: { scale: 1, y: 0, opacity: 1, zIndex: 30 },
  behind1: { scale: 0.96, y: 16, opacity: 0.6, zIndex: 20 },
  behind2: { scale: 0.92, y: 32, opacity: 0.35, zIndex: 10 },
  hidden: { scale: 0.88, y: 48, opacity: 0, zIndex: 0 },
}

function getPosition(i: number, active: number, total: number): Position {
  const rel = ((i - active) % total + total) % total
  if (rel === 0)
    return 'active'
  if (rel === 1)
    return 'behind1'
  if (rel === 2 && total > 2)
    return 'behind2'
  return 'hidden'
}

const DRAG_THRESHOLD = 80

export function ProjectStack({ items }: { items: readonly ProjectItem[] }) {
  const { t } = useTranslation()
  const localize = useLocalize()
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [glitching, setGlitching] = useState(false)
  const total = items.length
  const titleId = useId()

  const advance = useCallback((step: number) => {
    setActive(prev => ((prev + step) % total + total) % total)
    setGlitching(true)
  }, [total])

  const goTo = (idx: number) => {
    if (idx === active)
      return
    setActive(idx)
    setGlitching(true)
  }

  // 切换后短暂触发 glitch；再次切换会重置定时器，连点也能持续故障
  useEffect(() => {
    if (!glitching)
      return
    const t = setTimeout(setGlitching, 450, false)
    return () => clearTimeout(t)
  }, [glitching, active])

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
            className="group relative flex flex-col bg-terminal-bgAlt p-6"
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

      <div className="relative mx-auto h-[17rem] w-full max-w-3xl overflow-hidden sm:h-[16rem]">
        <AnimatePresence initial={false}>
          {items.map((project, i) => {
            const pos = getPosition(i, active, total)
            const isActive = pos === 'active'
            return (
              <motion.div
                key={project.slug}
                className="absolute inset-x-0 top-0 mx-auto h-60 w-[88%] sm:h-56 sm:w-[80%]"
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
                  if (!isActive)
                    goTo(i)
                }}
                aria-hidden={!isActive}
                aria-roledescription="slide"
                aria-label={`${i + 1} / ${total}`}
              >
                <ProjectCard
                  project={project}
                  localize={localize}
                  viewDetails={t('projects.viewDetails')}
                  isActive={isActive}
                  glitching={isActive && glitching}
                  index={i}
                  total={total}
                />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Arrow controls */}
      <button
        type="button"
        onClick={() => advance(-1)}
        aria-label={t('projects.previous')}
        className="absolute left-1 top-[40%] z-50 -translate-y-1/2 p-2 text-terminal-fgDim transition hover:text-neon-cyan focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neon-cyan sm:left-3"
      >
        <ChevronLeft className="size-5" strokeWidth={1.5} />
      </button>
      <button
        type="button"
        onClick={() => advance(1)}
        aria-label={t('projects.next')}
        className="absolute right-1 top-[40%] z-50 -translate-y-1/2 p-2 text-terminal-fgDim transition hover:text-neon-cyan focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neon-cyan sm:right-3"
      >
        <ChevronRight className="size-5" strokeWidth={1.5} />
      </button>

      {/* Indicator dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {items.map((p, i) => {
          const isOn = i === active
          return (
            <button
              type="button"
              key={p.slug}
              onClick={() => goTo(i)}
              aria-label={t('projects.gotoSlide', { n: i + 1 })}
              aria-current={isOn}
              className={`h-1.5 rounded-full transition-all ${
                isOn ? 'w-8 bg-neon-cyan shadow-neon-cyan' : 'w-3 bg-terminal-border hover:bg-terminal-fgDim'
              }`}
            />
          )
        })}
      </div>
    </div>
  )
}

/** 单张赛博朋克风项目卡：HUD 角标 + 顶部 file tab + 扫描线 + 闪烁光标 */
function ProjectCard({
  project,
  localize,
  viewDetails,
  isActive,
  glitching,
  index,
  total,
}: {
  project: ProjectItem
  localize: (s: { zh: string, en: string }) => string
  viewDetails: string
  isActive: boolean
  glitching: boolean
  index: number
  total: number
}) {
  return (
    <article
      className={`relative flex h-full flex-col bg-terminal-bgAlt ${isActive ? '' : 'cursor-pointer'} ${
        glitching ? 'animate-card-glitch' : ''
      }`}
    >
      {/* HUD 四角 */}
      <CornerBracket position="tl" active={isActive} />
      <CornerBracket position="tr" active={isActive} />
      <CornerBracket position="bl" active={isActive} />
      <CornerBracket position="br" active={isActive} />

      {/* 扫描线（仅 active 卡） */}
      {isActive && (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-neon-cyan shadow-[0_0_12px_3px_rgba(0,245,255,0.6)] animate-card-scan" />
      )}

      {/* 顶部 file tab */}
      <header className="flex items-center justify-between border-b border-neon-cyan/15 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-terminal-fgDim">
        <span className="flex items-center gap-2">
          <span className={`size-1.5 rounded-full ${isActive ? 'bg-neon-cyan shadow-neon-cyan animate-pulse-neon' : 'bg-terminal-border'}`} />
          <span className="truncate">
            ./projects/
            <span className="text-neon-cyan/80">{project.slug}</span>
            .tsx
          </span>
        </span>
        <span className="ml-3 shrink-0 text-neon-cyan/60">
          {String(index + 1).padStart(2, '0')}
          {' / '}
          {String(total).padStart(2, '0')}
        </span>
      </header>

      {/* 内容 */}
      <div className="flex flex-1 flex-col px-5 py-4">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="flex items-center gap-2 font-mono text-lg leading-tight text-neon-cyan text-glow-cyan">
            <span className="text-neon-magenta">▶</span>
            <span>{localize(project.name)}</span>
            {isActive && (
              <span className="ml-0.5 inline-block h-4 w-1.5 -translate-y-px animate-cursor-blink bg-neon-cyan" />
            )}
          </h3>
          <Link
            to={`/projects/${project.slug}`}
            tabIndex={isActive ? 0 : -1}
            className="inline-flex shrink-0 items-center gap-1 font-mono text-xs text-terminal-fgDim transition hover:text-neon-cyan"
            onClick={e => e.stopPropagation()}
          >
            {viewDetails}
            <ArrowUpRight className="size-3" />
          </Link>
        </div>

        <p className="mb-4 line-clamp-2 font-mono text-sm leading-relaxed text-terminal-fg/90">
          <span className="mr-1 text-terminal-fgDim">&gt;</span>
          {localize(project.tagline)}
        </p>

        <div className="mt-auto">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-terminal-fgDim">
            [ stack ]
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 6).map(tech => (
              <Tag key={tech} variant="muted">
                {tech}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

/** 角标：1px 的 L 形线，长 14px，颜色随激活态变 */
function CornerBracket({ position, active }: { position: 'tl' | 'tr' | 'bl' | 'br', active: boolean }) {
  const color = active ? 'border-neon-cyan' : 'border-terminal-border'
  const map: Record<typeof position, string> = {
    tl: 'left-0 top-0 border-l border-t',
    tr: 'right-0 top-0 border-r border-t',
    bl: 'bottom-0 left-0 border-l border-b',
    br: 'bottom-0 right-0 border-r border-b',
  }
  return <span className={`pointer-events-none absolute size-3 ${map[position]} ${color}`} />
}

/** Reduced-motion 退化：扁平卡，无 HUD 装饰 */
function ProjectCardBody({
  project,
  localize,
  viewDetails,
}: {
  project: ProjectItem
  localize: (s: { zh: string, en: string }) => string
  viewDetails: string
}) {
  return (
    <>
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="font-mono text-lg leading-tight text-neon-cyan">
          {localize(project.name)}
        </h3>
        <Link
          to={`/projects/${project.slug}`}
          className="inline-flex shrink-0 items-center gap-1 font-mono text-xs text-terminal-fgDim transition hover:text-neon-cyan"
        >
          {viewDetails}
          <ArrowUpRight className="size-3" />
        </Link>
      </div>
      <p className="mb-4 font-mono text-sm leading-relaxed text-terminal-fg">{localize(project.tagline)}</p>
      <div className="mt-auto flex flex-wrap gap-1.5">
        {project.techStack.slice(0, 6).map(tech => (
          <Tag key={tech} variant="muted">{tech}</Tag>
        ))}
      </div>
    </>
  )
}
