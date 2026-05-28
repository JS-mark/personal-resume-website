import { loadFont } from '@remotion/google-fonts/JetBrainsMono'

/**
 * 在 Remotion composition 内调用 loadFont() 以保证字体在渲染时已加载。
 * 返回值供 React 组件使用：const { fontFamily } = ensureFonts()
 */
let cached: ReturnType<typeof loadFont> | null = null

export function ensureFonts() {
  if (!cached)
    cached = loadFont('normal', { subsets: ['latin'], weights: ['400', '700'] })
  return cached
}

export const fontFamily = '"JetBrains Mono", ui-monospace, monospace'
