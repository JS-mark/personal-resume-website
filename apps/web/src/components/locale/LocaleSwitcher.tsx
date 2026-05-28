import type { Locale } from '@resume/data'
import { useTranslation } from 'react-i18next'

const locales: Array<{ code: Locale; label: string }> = [
  { code: 'en', label: 'EN' },
  { code: 'zh', label: '中' },
]

export function LocaleSwitcher() {
  const { i18n } = useTranslation()
  const current: Locale = i18n.language.startsWith('zh') ? 'zh' : 'en'

  return (
    <div className="inline-flex items-center gap-1 font-mono text-xs">
      {locales.map(({ code, label }, i) => (
        <span key={code} className="contents">
          <button
            type="button"
            onClick={() => void i18n.changeLanguage(code)}
            className={`transition ${
              current === code
                ? 'text-neon-cyan text-glow-cyan'
                : 'text-terminal-fgDim hover:text-neon-cyan'
            }`}
          >
            {label}
          </button>
          {i < locales.length - 1 && <span className="text-terminal-border">|</span>}
        </span>
      ))}
    </div>
  )
}
