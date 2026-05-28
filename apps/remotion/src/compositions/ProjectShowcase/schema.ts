import type { z } from 'zod'
import { localeSchema, projectItemSchema } from '@resume/data'
import { z as zod } from 'zod'

export const projectShowcaseSchema = zod.object({
  project: projectItemSchema,
  locale: localeSchema,
})

export type ProjectShowcaseProps = z.infer<typeof projectShowcaseSchema>

export const projectShowcaseDefaults: ProjectShowcaseProps = {
  project: {
    slug: 'demo',
    name: { zh: '示例项目', en: 'Demo Project' },
    tagline: { zh: '一段简短描述', en: 'A short tagline' },
    description: { zh: '详细描述', en: 'Long description' },
    startDate: '2024-01',
    endDate: '2024-06',
    techStack: ['TypeScript', 'React'],
    highlights: [{ zh: '核心亮点', en: 'Core highlight' }],
    media: {},
  },
  locale: 'en',
}
