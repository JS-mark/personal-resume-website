import type { z } from 'zod'
import { localeSchema, skillSchema } from '@resume/data'
import { z as zod } from 'zod'

export const skillsShowcaseSchema = zod.object({
  skills: zod.array(skillSchema),
  locale: localeSchema,
  layout: zod.enum(['bars', 'radar', 'cloud']),
})

export type SkillsShowcaseProps = z.infer<typeof skillsShowcaseSchema>

export const skillsShowcaseDefaults: SkillsShowcaseProps = {
  skills: [
    { name: 'TypeScript', category: 'language', level: 5, yearsExperience: 8 },
    { name: 'React', category: 'framework', level: 5, yearsExperience: 8 },
    { name: 'Rust', category: 'language', level: 4, yearsExperience: 3 },
    { name: 'Node.js', category: 'framework', level: 5, yearsExperience: 8 },
    { name: 'Vite', category: 'tool', level: 5, yearsExperience: 3 },
  ],
  locale: 'en',
  layout: 'bars',
}
