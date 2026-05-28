import { resume } from '@resume/data'
import { Github, Heart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLocale, useLocalize } from '@/hooks/useLocalizedString'

/**
 * 站底信息条：作者、开源协议、源码链接、版本号。
 * 数据由 packages/data 的 resume.meta.credits 驱动，缺省时不渲染。
 */
export function SiteFooter() {
  const { t } = useTranslation()
  const locale = useLocale()
  const localize = useLocalize()
  const credits = resume.meta.credits
  if (!credits)
    return null

  const author = localize(credits.author)

  return (
    <footer className="relative z-10 mt-16 border-t border-terminal-border/60 bg-terminal-bgPanel/80 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl px-4 py-6 font-mono text-xs">
        <p className="mb-3 text-terminal-fgDim">
          <span className="text-status-success">$</span>
          {' '}
          cat ~/credits.txt
        </p>

        <div className="flex flex-col gap-y-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-terminal-fg">
            <span className="text-terminal-fgDim">&gt;</span>
            <span>{t('footer.craftedBy')}</span>
            <span className="inline-flex items-center gap-1 text-neon-magenta text-glow-magenta">
              <Heart className="size-3 fill-current" aria-hidden />
              {author}
            </span>
            {t('footer.craftedBySuffix') && <span>{t('footer.craftedBySuffix')}</span>}
            <span className="text-terminal-border">·</span>
            {credits.openSource && (
              <>
                <span className="text-status-success">{t('footer.openSource')}</span>
                <span className="text-terminal-border">·</span>
              </>
            )}
            {credits.license && (
              locale === 'zh'
                ? (
                    <span>
                      <span className="text-neon-cyan">{credits.license}</span>
                      <span className="text-terminal-fgDim">
                        {' '}
                        {t('footer.licensed')}
                      </span>
                    </span>
                  )
                : (
                    <span>
                      <span className="text-terminal-fgDim">
                        {t('footer.licensed')}
                        {' '}
                      </span>
                      <span className="text-neon-cyan">{credits.license}</span>
                    </span>
                  )
            )}
          </div>

          <div className="flex items-center gap-3 text-terminal-fgDim">
            {credits.sourceUrl && (
              <a
                href={credits.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 transition hover:text-neon-cyan"
              >
                <Github className="size-3.5" aria-hidden />
                <span>{t('footer.viewSource')}</span>
                <span aria-hidden>→</span>
              </a>
            )}
            <span className="text-terminal-border">|</span>
            <span>
              v
              {resume.meta.version}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
