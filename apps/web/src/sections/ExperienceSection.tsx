import { formatYearMonth, resume } from '@resume/data'
import { CareerTimeline, compositionMeta } from '@resume/remotion'
import { useTranslation } from 'react-i18next'
import { Reveal } from '@/components/effects/Reveal'
import { RevealItem, RevealStagger } from '@/components/effects/RevealStagger'
import { SectionHeader } from '@/components/layout/SectionHeader'
import { VideoWithFallback } from '@/components/video/VideoWithFallback'
import { useLocale, useLocalize } from '@/hooks/useLocalizedString'

export function ExperienceSection() {
  const { t } = useTranslation()
  const locale = useLocale()
  const localize = useLocalize()
  const meta = compositionMeta.CareerTimeline

  return (
    <section id="experience" className="mx-auto max-w-4xl scroll-mt-20 px-4 py-16">
      <SectionHeader id="experience" title={t('experience.title')} command={t('experience.command')} />

      <div className="mb-8">
        <VideoWithFallback
          manifestKey="timeline"
          component={CareerTimeline}
          inputProps={{ work: resume.work, locale }}
          fps={meta.fps}
          durationInFrames={meta.durationInFrames}
          compositionWidth={meta.width}
          compositionHeight={meta.height}
          loop
          ariaLabel="career timeline video"
        />
      </div>

      <RevealStagger as="ol" className="relative space-y-12 border-l border-terminal-border/60 pl-10" stagger={0.12}>
        {resume.work.map((work, idx) => (
          <RevealItem key={`${work.startDate}-${idx}`} as="li" className="relative pl-[10px]" y={28}>
            <span className="absolute -left-[18px] top-1.5 size-3 rounded-full bg-neon-cyan shadow-neon-cyan ring-4 ring-terminal-bg" />

            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-terminal-fgDim">
              {formatYearMonth(work.startDate, locale)}
              {' — '}
              {work.endDate ? formatYearMonth(work.endDate, locale) : t('experience.present')}
            </p>
            <h3 className="font-mono text-lg text-neon-cyan">
              {localize(work.position)}
              {' '}
              <span className="text-terminal-fgDim">@</span>
              {' '}
              <span className="text-neon-magenta">{localize(work.name)}</span>
            </h3>

            <ul className="mt-4 space-y-1.5 font-mono text-sm leading-relaxed text-terminal-fg/85">
              {work.highlights.map((h, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-px shrink-0 text-neon-cyan/80">▸</span>
                  <span>{localize(h)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-terminal-fgDim">
              {work.techStack.map(tech => (
                <span key={tech}>
                  <span className="mr-1 text-neon-cyan/50">#</span>
                  {tech}
                </span>
              ))}
            </div>
          </RevealItem>
        ))}
      </RevealStagger>
    </section>
  )
}
