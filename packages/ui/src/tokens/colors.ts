/**
 * 赛博朋克色彩 token，跨网站与 Remotion 共享。
 * 所有视觉相关的字面值都集中在这里，避免在多处硬编码 #00f5ff。
 */

export const colors = {
  neon: {
    cyan: '#00f5ff',
    magenta: '#ff00aa',
    green: '#39ff14',
    purple: '#9d4edd',
    yellow: '#ffe600',
  },
  terminal: {
    bg: '#0a0a0a',
    bgAlt: '#0f0f14',
    bgPanel: '#13131c',
    fg: '#e6e6e6',
    fgDim: '#9aa0a6',
    fgMuted: '#6a6a7a',
    border: '#2a2a35',
    borderGlow: '#00f5ff',
  },
  status: {
    success: '#39ff14',
    warning: '#ffe600',
    error: '#ff3860',
    info: '#00f5ff',
  },
} as const

export type ColorTokens = typeof colors
