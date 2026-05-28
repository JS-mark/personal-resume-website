import { resume } from '@resume/data'
import { useTranslation } from 'react-i18next'
import { Reveal } from '@/components/effects/Reveal'
import { SectionHeader } from '@/components/layout/SectionHeader'
import { useLocalize } from '@/hooks/useLocalizedString'

export function AboutSection() {
  const { t } = useTranslation()
  const localize = useLocalize()
  const { basics } = resume

  return (
    <section id="about" className="mx-auto max-w-4xl scroll-mt-20 px-4 py-16">
      <SectionHeader id="about" title={t('about.title')} command={t('about.command')} />

      <Reveal as="div" className="border border-terminal-border bg-terminal-bgAlt/70 p-6 font-mono text-sm leading-relaxed text-terminal-fg shadow-panel" delay={0.05}>
        <p className="whitespace-pre-line">{localize(basics.summary)}</p>
        <dl className="mt-6 grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
          <div>
            <dt className="text-terminal-fgDim">location</dt>
            <dd className="text-neon-cyan">
              {localize(basics.location.city)}
              ,
              {' '}
              {basics.location.countryCode}
            </dd>
          </div>
          <div>
            <dt className="text-terminal-fgDim">email</dt>
            <dd className="text-neon-cyan break-all">{basics.email}</dd>
          </div>
        </dl>
      </Reveal>
    </section>
  )
}
