import type { z } from 'zod'
import { localeSchema, localizedStringSchema } from '@resume/data'
import { z as zod } from 'zod'

export const heroIntroSchema = zod.object({
  name: zod.string(),
  taglines: zod.array(localizedStringSchema),
  locale: localeSchema,
})

export type HeroIntroProps = z.infer<typeof heroIntroSchema>

export const heroIntroDefaults: HeroIntroProps = {
  name: 'JSMark',
  taglines: [
    { zh: '> 我用代码讲故事', en: '> I tell stories with code' },
    { zh: '> 把复杂变简单', en: '> Turning complexity into clarity' },
  ],
  locale: 'en',
}
