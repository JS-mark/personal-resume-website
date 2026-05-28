import { resume } from '@resume/data'
import { Tag } from '@resume/ui'
import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { RevealItem, RevealStagger } from '@/components/effects/RevealStagger'
import { SectionHeader } from '@/components/layout/SectionHeader'
import { useLocalize } from '@/hooks/useLocalizedString'

export function ProjectsSection() {
  const { t } = useTranslation()
  const localize = useLocalize()

  return (
    <section id="projects" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-16">
      <SectionHeader id="projects" title={t('projects.title')} command={t('projects.command')} />

      <RevealStagger as="ul" className="grid grid-cols-1 gap-6 md:grid-cols-2" stagger={0.08}>
        {resume.projects.map(project => (
          <RevealItem
            key={project.slug}
            as="li"
            className="group relative flex flex-col border border-terminal-border bg-terminal-bgAlt/70 p-6 shadow-panel transition hover:border-neon-cyan hover:shadow-neon-cyan"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <h3 className="font-mono text-lg text-neon-cyan">{localize(project.name)}</h3>
              <Link
                to={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1 font-mono text-xs text-terminal-fgDim transition hover:text-neon-cyan"
              >
                {t('projects.viewDetails')}
                <ArrowUpRight className="size-3" />
              </Link>
            </div>
            <p className="mb-4 font-mono text-sm text-terminal-fg">{localize(project.tagline)}</p>
            <div className="mt-auto flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 6).map(tech => (
                <Tag key={tech} variant="muted">
                  {tech}
                </Tag>
              ))}
            </div>
          </RevealItem>
        ))}
      </RevealStagger>
    </section>
  )
}
