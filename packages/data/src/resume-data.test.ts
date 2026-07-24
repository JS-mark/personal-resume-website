import { describe, expect, it } from 'vitest'
import { projects, projectsBySlug } from './projects'
import { resume } from './resume'
import { projectItemSchema, resumeSchema } from './schema'

describe('resume data', () => {
  it('conforms to resumeSchema', () => {
    // 核心断言：真实简历数据必须通过 schema 校验，防止数据结构漂移。
    const result = resumeSchema.safeParse(resume)
    expect(result.success).toBe(true)
  })

  it('has a non-empty work history with ISO yyyy-mm start dates', () => {
    expect(resume.work.length).toBeGreaterThan(0)
    for (const w of resume.work)
      expect(w.startDate).toMatch(/^\d{4}-\d{2}$/)
  })

  it('has skill levels within the 1..5 range', () => {
    expect(resume.skills.length).toBeGreaterThan(0)
    for (const s of resume.skills)
      expect(s.level).toBeGreaterThanOrEqual(1)
    for (const s of resume.skills)
      expect(s.level).toBeLessThanOrEqual(5)
  })
})

describe('projects data', () => {
  it('every project conforms to projectItemSchema', () => {
    expect(projects.length).toBeGreaterThan(0)
    for (const p of projects)
      expect(projectItemSchema.safeParse(p).success).toBe(true)
  })

  it('project slugs are unique', () => {
    const slugs = projects.map(p => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('projectsBySlug indexes every project by its slug', () => {
    for (const p of projects)
      expect(projectsBySlug[p.slug]).toBe(p)
    expect(Object.keys(projectsBySlug)).toHaveLength(projects.length)
  })
})
