import { z } from 'zod'

/**
 * zod schema 镜像 ./types.ts。
 * 同时被 Remotion v4 的 <Composition schema={...}> 消费，以及网站端运行时校验入参。
 */

export const localeSchema = z.enum(['zh', 'en'])

export const localizedStringSchema = z.object({
  zh: z.string(),
  en: z.string(),
})

export const skillCategorySchema = z.enum([
  'language',
  'framework',
  'tool',
  'platform',
  'soft',
])

export const skillSchema = z.object({
  name: z.string(),
  category: skillCategorySchema,
  level: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
  ]),
  icon: z.string().optional(),
  yearsExperience: z.number().optional(),
  keywords: z.array(localizedStringSchema).optional(),
})

export const metricSchema = z.object({
  label: localizedStringSchema,
  value: z.string(),
  delta: z.string().optional(),
})

export const workItemSchema = z.object({
  name: localizedStringSchema,
  position: localizedStringSchema,
  url: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  summary: localizedStringSchema,
  highlights: z.array(localizedStringSchema),
  techStack: z.array(z.string()),
  metrics: z.array(metricSchema).optional(),
})

export const educationItemSchema = z.object({
  institution: localizedStringSchema,
  area: localizedStringSchema,
  studyType: localizedStringSchema,
  startDate: z.string(),
  endDate: z.string().optional(),
  score: z.string().optional(),
  courses: z.array(localizedStringSchema).optional(),
})

export const archDiagramSchema = z.object({
  nodes: z.array(z.object({
    id: z.string(),
    label: z.string(),
    x: z.number().optional(),
    y: z.number().optional(),
  })),
  edges: z.array(z.object({
    from: z.string(),
    to: z.string(),
    label: z.string().optional(),
  })),
})

export const mediaAssetsSchema = z.object({
  videoCompositionId: z.string().optional(),
  mp4Url: z.string().optional(),
  webmUrl: z.string().optional(),
  lottieUrl: z.string().optional(),
  posterUrl: z.string().optional(),
})

export const projectItemSchema = z.object({
  slug: z.string(),
  name: localizedStringSchema,
  tagline: localizedStringSchema,
  description: localizedStringSchema,
  startDate: z.string(),
  endDate: z.string().optional(),
  url: z.string().optional(),
  repoUrl: z.string().optional(),
  techStack: z.array(z.string()),
  highlights: z.array(localizedStringSchema),
  metrics: z.array(metricSchema).optional(),
  archDiagram: archDiagramSchema.optional(),
  media: mediaAssetsSchema,
  codeSnippet: z.object({
    language: z.string(),
    code: z.string(),
  }).optional(),
})

export const resumeBasicsSchema = z.object({
  name: z.string(),
  nameLocalized: localizedStringSchema.optional(),
  label: localizedStringSchema,
  image: z.string().optional(),
  email: z.string(),
  phone: z.string().optional(),
  url: z.string().optional(),
  summary: localizedStringSchema,
  location: z.object({
    city: localizedStringSchema,
    countryCode: z.string(),
  }),
  profiles: z.array(z.object({
    network: z.string(),
    username: z.string(),
    url: z.string(),
  })),
  taglines: z.array(localizedStringSchema).optional(),
})

export const resumeSchema = z.object({
  $schema: z.literal('https://jsonresume.org/schema/'),
  basics: resumeBasicsSchema,
  work: z.array(workItemSchema),
  education: z.array(educationItemSchema),
  skills: z.array(skillSchema),
  projects: z.array(projectItemSchema),
  meta: z.object({
    version: z.string(),
    lastModified: z.string(),
    canonical: z.string(),
    credits: z.object({
      author: localizedStringSchema,
      sourceUrl: z.string().optional(),
      license: z.string().optional(),
      openSource: z.boolean().optional(),
    }).optional(),
  }),
})
