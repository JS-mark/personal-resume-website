import { describe, expect, it } from 'vitest'
import {
  localizedStringSchema,
  projectItemSchema,
  skillSchema,
  workItemSchema,
} from './schema'

describe('localizedStringSchema', () => {
  it('accepts an object with both zh and en strings', () => {
    const result = localizedStringSchema.safeParse({ zh: '你好', en: 'Hi' })
    expect(result.success).toBe(true)
  })

  it('rejects when a locale key is missing', () => {
    expect(() => localizedStringSchema.parse({ en: 'Hi' })).toThrow()
  })

  it('rejects when a locale value is not a string', () => {
    expect(() => localizedStringSchema.parse({ zh: 1, en: 'Hi' })).toThrow()
  })
})

describe('skillSchema', () => {
  it('accepts a valid skill', () => {
    const result = skillSchema.safeParse({
      name: 'TypeScript',
      category: 'language',
      level: 5,
    })
    expect(result.success).toBe(true)
  })

  it('rejects an unknown category', () => {
    expect(() => skillSchema.parse({
      name: 'TypeScript',
      category: 'wizardry',
      level: 5,
    })).toThrow()
  })

  it('rejects a level outside the 1..5 literal union', () => {
    expect(() => skillSchema.parse({
      name: 'TypeScript',
      category: 'language',
      level: 6,
    })).toThrow()
  })
})

describe('workItemSchema', () => {
  const validWork = {
    name: { zh: '公司', en: 'Company' },
    position: { zh: '工程师', en: 'Engineer' },
    startDate: '2021-10',
    summary: { zh: '摘要', en: 'Summary' },
    highlights: [{ zh: '亮点', en: 'Highlight' }],
    techStack: ['TypeScript'],
  }

  it('accepts a valid work item (endDate optional)', () => {
    expect(workItemSchema.safeParse(validWork).success).toBe(true)
  })

  it('rejects a work item missing required highlights', () => {
    const { highlights, ...withoutHighlights } = validWork
    expect(() => workItemSchema.parse(withoutHighlights)).toThrow()
  })

  it('rejects a techStack containing non-string entries', () => {
    expect(() => workItemSchema.parse({ ...validWork, techStack: [42] })).toThrow()
  })
})

describe('projectItemSchema', () => {
  const validProject = {
    slug: 'demo',
    name: { zh: '演示', en: 'Demo' },
    tagline: { zh: '标语', en: 'Tagline' },
    description: { zh: '描述', en: 'Description' },
    startDate: '2025-01',
    techStack: ['TypeScript'],
    highlights: [{ zh: '亮点', en: 'Highlight' }],
    media: {},
  }

  it('accepts a minimal valid project (media required, optionals omitted)', () => {
    expect(projectItemSchema.safeParse(validProject).success).toBe(true)
  })

  it('rejects a project missing the required media field', () => {
    const { media, ...withoutMedia } = validProject
    expect(() => projectItemSchema.parse(withoutMedia)).toThrow()
  })
})
