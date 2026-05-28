import { projectsBySlug } from '@resume/data'
import { compositionMeta, ProjectShowcase } from '@resume/remotion'
import { Tag } from '@resume/ui'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { VideoWithFallback } from '@/components/video/VideoWithFallback'
import { useLocale, useLocalize } from '@/hooks/useLocalizedString'

export function ProjectDetailPage() {
  const { t } = useTranslation()
  const locale = useLocale()
  const { slug } = useParams<{ slug: string }>()
  const localize = useLocalize()
  const meta = compositionMeta.ProjectShowcase

  if (!slug || !projectsBySlug[slug]) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 font-mono text-terminal-fg">
        <p className="text-status-error">
          project not found:
          {slug}
        </p>
        <Link to="/" className="mt-4 inline-flex items-center gap-1 text-neon-cyan">
          <ArrowLeft className="size-4" />
          {t('common.back')}
        </Link>
      </div>
    )
  }

  const project = projectsBySlug[slug]

  return (
    <article className="mx-auto max-w-4xl px-4 py-16 font-mono">
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-1 text-xs text-terminal-fgDim transition hover:text-neon-cyan"
      >
        <ArrowLeft className="size-3" />
        {t('common.back')}
      </Link>

      <header className="mb-8">
        <p className="text-xs text-terminal-fgDim">
          $ cat ./projects/
          {project.slug}
          /README.md
        </p>
        <h1 className="mt-2 text-3xl font-bold text-neon-cyan text-glow-cyan md:text-4xl">
          {localize(project.name)}
        </h1>
        <p className="mt-3 text-base text-neon-magenta">{localize(project.tagline)}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 border border-neon-cyan px-3 py-1 text-xs text-neon-cyan transition hover:bg-neon-cyan/10"
            >
              <ExternalLink className="size-3" />
              {t('projects.viewLive')}
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 border border-terminal-border px-3 py-1 text-xs text-terminal-fg transition hover:border-neon-cyan hover:text-neon-cyan"
            >
              <Github className="size-3" />
              {t('projects.viewRepo')}
            </a>
          )}
        </div>
      </header>

      <section className="mb-8">
        <VideoWithFallback
          manifestKey={`project-${project.slug}`}
          component={ProjectShowcase}
          inputProps={{ project, locale }}
          fps={meta.fps}
          durationInFrames={meta.durationInFrames}
          compositionWidth={meta.width}
          compositionHeight={meta.height}
          loop
          ariaLabel={`${localize(project.name)} showcase video`}
        />
      </section>

      <section className="mb-8 border border-terminal-border bg-terminal-bgAlt/70 p-6">
        <p className="text-sm leading-relaxed text-terminal-fg">{localize(project.description)}</p>
      </section>

      {project.metrics && (
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {project.metrics.map(m => (
            <div key={m.label.zh} className="border border-terminal-border bg-terminal-bgAlt/60 p-4">
              <p className="text-xs text-terminal-fgDim">{localize(m.label)}</p>
              <p className="mt-1 text-2xl font-bold text-neon-cyan">{m.value}</p>
              {m.delta && <p className="text-xs text-status-success">{m.delta}</p>}
            </div>
          ))}
        </section>
      )}

      <section className="mb-8">
        <h2 className="mb-3 text-sm uppercase tracking-wider text-terminal-fgDim">
          {t('experience.highlights')}
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-terminal-fg marker:text-neon-cyan">
          {project.highlights.map(h => <li key={h.zh}>{localize(h)}</li>)}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-sm uppercase tracking-wider text-terminal-fgDim">
          {t('experience.techStack')}
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map(tech => <Tag key={tech} variant="cyan">{tech}</Tag>)}
        </div>
      </section>

      {project.codeSnippet && (
        <section className="mb-8">
          <p className="mb-2 text-xs text-terminal-fgDim">
            $ cat ./snippet.
            {project.codeSnippet.language}
          </p>
          <pre className="overflow-auto border border-terminal-border bg-terminal-bgPanel p-4 text-xs leading-relaxed text-neon-green">
            <code>{project.codeSnippet.code}</code>
          </pre>
        </section>
      )}
    </article>
  )
}
