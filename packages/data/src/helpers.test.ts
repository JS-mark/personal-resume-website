import type { LocalizedString } from './types'
import { describe, expect, it } from 'vitest'
import {
  calculateYearsOfExperience,
  formatYearMonth,
  localize,
  skillLevelLabel,
} from './helpers'

describe('localize', () => {
  const value: LocalizedString = { zh: '你好', en: 'Hello' }

  it('returns the string for the requested locale', () => {
    expect(localize(value, 'zh')).toBe('你好')
    expect(localize(value, 'en')).toBe('Hello')
  })

  it('falls back to English when the localized value is missing', () => {
    // 运行时可能拿到缺 zh 字段的数据（如外部注入），此时应回退到 en。
    const partial = { en: 'Only English' } as unknown as LocalizedString
    expect(localize(partial, 'zh')).toBe('Only English')
  })
})

describe('formatYearMonth', () => {
  it('formats an ISO yyyy-mm string in English', () => {
    expect(formatYearMonth('2024-01', 'en')).toBe('Jan 2024')
    expect(formatYearMonth('2021-10', 'en')).toBe('Oct 2021')
    expect(formatYearMonth('2020-12', 'en')).toBe('Dec 2020')
  })

  it('formats an ISO yyyy-mm string in Chinese', () => {
    expect(formatYearMonth('2024-01', 'zh')).toBe('2024 年 1 月')
    expect(formatYearMonth('2021-10', 'zh')).toBe('2021 年 10 月')
  })

  it('defaults the month to 1/Jan when the month segment is missing or non-numeric', () => {
    // iso 只有年份时 monthStr 为 undefined → Number(undefined) = NaN → 回退到 1。
    expect(formatYearMonth('2024', 'en')).toBe('Jan 2024')
    expect(formatYearMonth('2024', 'zh')).toBe('2024 年 1 月')
  })
})

describe('skillLevelLabel', () => {
  it('maps each level to the correct English label', () => {
    expect(skillLevelLabel(1, 'en')).toBe('Beginner')
    expect(skillLevelLabel(3, 'en')).toBe('Proficient')
    expect(skillLevelLabel(5, 'en')).toBe('Expert')
  })

  it('maps each level to the correct Chinese label', () => {
    expect(skillLevelLabel(1, 'zh')).toBe('入门')
    expect(skillLevelLabel(4, 'zh')).toBe('资深')
    expect(skillLevelLabel(5, 'zh')).toBe('精通')
  })
})

describe('calculateYearsOfExperience', () => {
  it('returns 0 for an empty work history', () => {
    expect(calculateYearsOfExperience([])).toBe(0)
  })

  it('computes years from the earliest start date rounded to one decimal', () => {
    // 用相对 now 的固定跨度断言：正好一年前开始 → ≈ 1.0 年（容差覆盖闰年/取整）。
    const now = new Date()
    const oneYearAgo = `${now.getFullYear() - 1}-${String(now.getMonth() + 1).padStart(2, '0')}`
    const years = calculateYearsOfExperience([{ startDate: oneYearAgo }])
    expect(years).toBeGreaterThanOrEqual(0.9)
    expect(years).toBeLessThanOrEqual(1.2)
  })

  it('uses the earliest start date across multiple entries', () => {
    const now = new Date()
    const recent = `${now.getFullYear()}-01`
    const old = '2018-01'
    // 加入更早的 2018 记录后，年数必须显著大于只看今年的记录。
    const withOld = calculateYearsOfExperience([{ startDate: recent }, { startDate: old }])
    const recentOnly = calculateYearsOfExperience([{ startDate: recent }])
    expect(withOld).toBeGreaterThan(recentOnly)
    expect(withOld).toBeGreaterThanOrEqual(now.getFullYear() - 2018)
  })
})
