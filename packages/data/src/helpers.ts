import type { Locale, LocalizedString } from './types'

/**
 * 解 LocalizedString，回退到英文。
 * 命名沿用国际化生态惯例（i18n locale）。
 */
export function localize(value: LocalizedString, locale: Locale): string {
  return value[locale] ?? value.en
}

/** 格式化 ISO yyyy-mm 为更可读形式（en: "Jan 2024"，zh: "2024 年 1 月"） */
export function formatYearMonth(iso: string, locale: Locale): string {
  const [yearStr, monthStr] = iso.split('-')
  const year = Number(yearStr)
  const month = Number(monthStr) || 1

  if (locale === 'zh') {
    return `${year} 年 ${month} 月`
  }

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ]
  return `${monthNames[month - 1]} ${year}`
}

/** 技能等级到本地化标签的映射（5 级制） */
const SKILL_LEVEL_LABELS: Record<1 | 2 | 3 | 4 | 5, LocalizedString> = {
  5: { zh: '精通', en: 'Expert' },
  4: { zh: '资深', en: 'Advanced' },
  3: { zh: '熟练', en: 'Proficient' },
  2: { zh: '进阶', en: 'Intermediate' },
  1: { zh: '入门', en: 'Beginner' },
}

/** 把数字等级（1~5）翻译为面向人类的标签 */
export function skillLevelLabel(level: 1 | 2 | 3 | 4 | 5, locale: Locale): string {
  return localize(SKILL_LEVEL_LABELS[level], locale)
}

/** 计算职业经历总年数（向上取整到一位小数） */
export function calculateYearsOfExperience(work: Array<{ startDate: string; endDate?: string }>): number {
  if (work.length === 0)
    return 0

  const earliest = work.reduce((min, w) => (w.startDate < min ? w.startDate : min), work[0]!.startDate)
  const earliestDate = new Date(`${earliest}-01`)
  const now = new Date()
  const years = (now.getTime() - earliestDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
  return Math.round(years * 10) / 10
}
