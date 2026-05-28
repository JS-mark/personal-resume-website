import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 font-mono text-terminal-fg">
      <p className="text-7xl font-bold text-neon-magenta text-glow-magenta">{t('notFound.title')}</p>
      <p className="mt-4 text-sm text-terminal-fg">{t('notFound.message')}</p>
      <p className="mt-2 text-xs text-terminal-fgDim">{t('notFound.suggestion')}</p>
      <Link
        to="/"
        className="mt-6 inline-block border border-neon-cyan px-4 py-2 text-xs uppercase tracking-wider text-neon-cyan transition hover:bg-neon-cyan/10"
      >
        cd ~
      </Link>
    </div>
  )
}
