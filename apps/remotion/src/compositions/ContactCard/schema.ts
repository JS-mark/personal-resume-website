import type { z } from 'zod'
import { localeSchema, resumeBasicsSchema } from '@resume/data'
import { z as zod } from 'zod'

export const contactCardSchema = zod.object({
  basics: resumeBasicsSchema,
  qrPayload: zod.string(),
  locale: localeSchema,
})

export type ContactCardProps = z.infer<typeof contactCardSchema>

export const contactCardDefaults: ContactCardProps = {
  basics: {
    name: 'Mark',
    label: { zh: '工程师', en: 'Engineer' },
    email: 'hello@example.com',
    summary: { zh: '简介', en: 'Bio' },
    location: { city: { zh: '上海', en: 'Shanghai' }, countryCode: 'CN' },
    profiles: [],
  },
  qrPayload: 'https://example.com',
  locale: 'en',
}
