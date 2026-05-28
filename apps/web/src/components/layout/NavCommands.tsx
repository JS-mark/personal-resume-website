import { useTranslation } from 'react-i18next'
import { useActiveSection } from '@/hooks/useActiveSection'

const sectionIds = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'] as const
type SectionId = (typeof sectionIds)[number]

export function NavCommands() {
  const { t } = useTranslation()
  const active = useActiveSection(sectionIds)

  const handleClick = (id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="hidden items-center gap-1 font-mono text-xs md:flex">
      {sectionIds.map((id) => {
        const isActive = id === active
        const navKey = id === 'hero' ? 'home' : id
        return (
          <button
            key={id}
            type="button"
            onClick={() => handleClick(id)}
            aria-current={isActive ? 'true' : undefined}
            className={`px-2 py-1 transition focus:outline-none focus-visible:text-neon-cyan focus-visible:text-glow-cyan ${
              isActive
                ? 'text-neon-cyan text-glow-cyan'
                : 'text-terminal-fgDim hover:text-neon-cyan'
            }`}
          >
            <span className={isActive ? 'text-neon-cyan/70' : 'text-terminal-border'}>cd </span>
            /
            {t(`nav.${navKey}`)}
          </button>
        )
      })}
    </nav>
  )
}
