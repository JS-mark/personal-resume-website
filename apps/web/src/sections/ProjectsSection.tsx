import { resume } from '@resume/data'
import { useTranslation } from 'react-i18next'
import { ProjectStack } from '@/components/effects/ProjectStack'
import { SectionHeader } from '@/components/layout/SectionHeader'

export function ProjectsSection() {
  const { t } = useTranslation()

  return (
    <section id="projects" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-16">
      <SectionHeader id="projects" title={t('projects.title')} command={t('projects.command')} />
      <ProjectStack items={resume.projects} />
    </section>
  )
}
