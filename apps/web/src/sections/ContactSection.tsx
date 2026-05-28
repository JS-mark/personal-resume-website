import { resume } from '@resume/data'
import { compositionMeta, ContactCard } from '@resume/remotion'
import { NeonButton } from '@resume/ui'
import { Check, Copy, Mail } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Reveal } from '@/components/effects/Reveal'
import { RevealItem, RevealStagger } from '@/components/effects/RevealStagger'
import { SectionHeader } from '@/components/layout/SectionHeader'
import { VideoWithFallback } from '@/components/video/VideoWithFallback'
import { useLocale } from '@/hooks/useLocalizedString'

export function ContactSection() {
  const { t } = useTranslation()
  const locale = useLocale()
  const { basics } = resume
  const [copied, setCopied] = useState(false)
  const meta = compositionMeta.ContactCard

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(basics.email)
      setCopied(true)
      setTimeout(setCopied, 1500, false)
    }
    catch {
      // 不支持 clipboard 时静默失败
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-4xl scroll-mt-20 px-4 py-16">
      <SectionHeader id="contact" title={t('contact.title')} command={t('contact.command')} />

      <div className="mb-8">
        <VideoWithFallback
          manifestKey="contact"
          component={ContactCard}
          inputProps={{ basics, qrPayload: basics.url ?? '', locale }}
          fps={meta.fps}
          durationInFrames={meta.durationInFrames}
          compositionWidth={meta.width}
          compositionHeight={meta.height}
          loop
          ariaLabel="contact card video"
        />
      </div>

      <Reveal as="div" className="border border-terminal-border bg-terminal-bgAlt/70 p-6 shadow-panel" delay={0.1}>
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="font-mono">
            <p className="text-xs text-terminal-fgDim">$ echo $REACH_OUT</p>
            <p className="mt-2 break-all text-lg text-neon-cyan text-glow-cyan">{basics.email}</p>
          </div>
          <NeonButton variant="cyan" onClick={handleCopy} aria-live="polite">
            {copied
              ? (
                  <>
                    <Check className="size-4" />
                    {t('contact.copied')}
                  </>
                )
              : (
                  <>
                    <Copy className="size-4" />
                    {t('contact.copyEmail')}
                  </>
                )}
          </NeonButton>
        </div>

        <RevealStagger as="ul" className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3" stagger={0.05}>
          {basics.profiles.map(profile => (
            <RevealItem key={profile.network} as="li">
              <a
                href={profile.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 border border-terminal-border px-3 py-2 font-mono text-sm text-terminal-fg transition hover:border-neon-cyan hover:text-neon-cyan"
              >
                <Mail className="size-4 text-neon-cyan" />
                <span className="text-terminal-fgDim">{profile.network}</span>
                <span className="ml-auto truncate">{profile.username}</span>
              </a>
            </RevealItem>
          ))}
        </RevealStagger>
      </Reveal>
    </section>
  )
}
