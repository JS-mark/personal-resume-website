import type { ProjectItem } from '../types'
import { projectAiClient } from './project-ai-client'
import { projectClaudeCode } from './project-claude-code'
import { projectTiptapEditor } from './project-tiptap-editor'

export const projects: ProjectItem[] = [
  projectTiptapEditor,
  projectAiClient,
  projectClaudeCode,
]

export const projectsBySlug: Record<string, ProjectItem> = Object.fromEntries(
  projects.map(p => [p.slug, p]),
)
