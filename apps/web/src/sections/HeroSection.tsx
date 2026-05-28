import { resume } from '@resume/data'
import { compositionMeta, HeroIntro } from '@resume/remotion'
import { useTranslation } from 'react-i18next'
import { Reveal } from '@/components/effects/Reveal'
import { VideoWithFallback } from '@/components/video/VideoWithFallback'
import { useLocale, useLocalize } from '@/hooks/useLocalizedString'

export function HeroSection() {
  const { t } = useTranslation()
  const localize = useLocalize()
  const locale = useLocale()
  const { basics } = resume
  const name = basics.nameLocalized ? localize(basics.nameLocalized) : basics.name
  const meta = compositionMeta.HeroIntro

  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-5rem)] scroll-mt-20 flex-col items-center justify-center gap-8 px-4 py-16"
    >
      <div className="mx-auto w-full max-w-5xl">
        <VideoWithFallback
          manifestKey="heroIntro"
          component={HeroIntro}
          inputProps={{
            name,
            taglines: basics.taglines ?? [],
            locale,
          }}
          fps={meta.fps}
          durationInFrames={meta.durationInFrames}
          compositionWidth={meta.width}
          compositionHeight={meta.height}
          loop
          ariaLabel={`${t('nav.home')} hero intro video`}
        />
      </div>
      <Reveal as="div" delay={0.4}>
        <p className="font-mono text-xs text-terminal-fgDim">↓ {t('hero.subtitle')}</p>
      </Reveal>
    </section>
  )
}
