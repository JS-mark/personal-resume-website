import type { z } from 'zod'
import { localeSchema, workItemSchema } from '@resume/data'
import { z as zod } from 'zod'

export const careerTimelineSchema = zod.object({
  work: zod.array(workItemSchema),
  locale: localeSchema,
})

export type CareerTimelineProps = z.infer<typeof careerTimelineSchema>

export const careerTimelineDefaults: CareerTimelineProps = {
  work: [],
  locale: 'en',
}
