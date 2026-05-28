import type { Skill, SkillCategory } from '@resume/data'
import { resume } from '@resume/data'
import { compositionMeta, SkillsShowcase } from '@resume/remotion'
import { ProgressBar, Tag } from '@resume/ui'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Reveal } from '@/components/effects/Reveal'
import { RevealItem, RevealStagger } from '@/components/effects/RevealStagger'
import { SectionHeader } from '@/components/layout/SectionHeader'
import { VideoWithFallback } from '@/components/video/VideoWithFallback'
import { useLocale } from '@/hooks/useLocalizedString'

type Tab = SkillCategory | 'all'
/** 固定语义顺序——动态过滤后保持这个相对顺序 */
const CATEGORY_ORDER: SkillCategory[] = ['language', 'framework', 'tool', 'platform', 'soft']

type NeonVariant = 'cyan' | 'magenta' | 'green' | 'purple' | 'yellow'

/** 5 个 SkillCategory 各分配一种霓虹色，与 packages/ui 的 token 一一对应 */
const CATEGORY_COLOR: Record<SkillCategory, NeonVariant> = {
  language: 'cyan',
  framework: 'magenta',
  tool: 'green',
  platform: 'purple',
  soft: 'yellow',
}

const CATEGORY_TEXT_CLASS: Record<SkillCategory, string> = {
  language: 'text-neon-cyan',
  framework: 'text-neon-magenta',
  tool: 'text-neon-green',
  platform: 'text-neon-purple',
  soft: 'text-neon-yellow',
}

export function SkillsSection() {
  const { t } = useTranslation()
  const locale = useLocale()
  const meta = compositionMeta.SkillsShowcase

  // 只保留实际存在数据的分类，按 CATEGORY_ORDER 排序
  const tabs = useMemo<Tab[]>(() => {
    const present = new Set<SkillCategory>(resume.skills.map(s => s.category))
    return ['all', ...CATEGORY_ORDER.filter(c => present.has(c))]
  }, [])

  const [tab, setTab] = useState<Tab>('all')

  const filtered = useMemo<Skill[]>(
    () => (tab === 'all' ? resume.skills : resume.skills.filter(s => s.category === tab)),
    [tab],
  )

  return (
    <section id="skills" className="mx-auto max-w-4xl scroll-mt-20 px-4 py-16">
      <SectionHeader id="skills" title={t('skills.title')} command={t('skills.command')} />

      <div className="mb-8">
        <VideoWithFallback
          manifestKey="skills"
          component={SkillsShowcase}
          inputProps={{ skills: resume.skills, locale, layout: 'bars' as const }}
          fps={meta.fps}
          durationInFrames={meta.durationInFrames}
          compositionWidth={meta.width}
          compositionHeight={meta.height}
          loop
          ariaLabel="skills showcase video"
        />
      </div>

      <Reveal as="div" className="mb-6 flex flex-wrap gap-2" delay={0.1}>
        {tabs.map((value) => {
          const active = value === tab
          return (
            <button
              key={value}
              type="button"
              onClick={() => setTab(value)}
              aria-pressed={active}
              className={`border px-3 py-1 font-mono text-xs uppercase tracking-wider transition ${
                active
                  ? 'border-neon-cyan text-neon-cyan shadow-neon-cyan'
                  : 'border-terminal-border text-terminal-fgDim hover:border-neon-cyan hover:text-neon-cyan'
              }`}
            >
              {t(`skills.tabs.${value}`)}
            </button>
          )
        })}
      </Reveal>

      <RevealStagger
        key={tab}
        as="ul"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        stagger={0.05}
        amount={0}
      >
        {filtered.map(skill => (
          <RevealItem
            key={skill.name}
            as="li"
            className="border border-terminal-border bg-terminal-bgAlt/60 p-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className={`font-mono text-sm ${CATEGORY_TEXT_CLASS[skill.category]}`}>
                {skill.name}
              </span>
              <Tag variant={CATEGORY_COLOR[skill.category]}>{skill.category}</Tag>
            </div>
            <ProgressBar
              value={skill.level / 5}
              segmented
              variant={CATEGORY_COLOR[skill.category]}
              rightLabel={
                skill.yearsExperience
                  ? t('skills.yearsExp', { count: skill.yearsExperience })
                  : `Lv.${skill.level}`
              }
            />
          </RevealItem>
        ))}
      </RevealStagger>
    </section>
  )
}
