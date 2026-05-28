import type { Locale, LocalizedString } from '@resume/data'
import { localize } from '@resume/data'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

/** 当前 locale，从 i18next 派生 */
export function useLocale(): Locale {
  const { i18n } = useTranslation()
  return i18n.language.startsWith('zh') ? 'zh' : 'en'
}

/** 返回一个把 LocalizedString 解为字符串的函数（带 locale 闭包） */
export function useLocalize(): (value: LocalizedString) => string {
  const locale = useLocale()
  return useCallback((value: LocalizedString) => localize(value, locale), [locale])
}
