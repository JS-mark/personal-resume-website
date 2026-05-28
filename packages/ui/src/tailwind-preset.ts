import type { Config } from 'tailwindcss'
import { colors } from './tokens/colors'

/**
 * 赛博朋克 Tailwind preset，被 apps/web 与 apps/remotion 同时引用。
 * 集中所有调色板、字体、动画与关键帧。
 */
export const cyberpunkPreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        neon: colors.neon,
        terminal: colors.terminal,
        status: colors.status,
      },
      fontFamily: {
        mono: [
          '"JetBrains Mono"',
          '"Geist Mono"',
          '"SF Mono"',
          'ui-monospace',
          'monospace',
        ],
        display: [
          '"JetBrains Mono"',
          '"Geist Mono"',
          'ui-monospace',
          'monospace',
        ],
      },
      boxShadow: {
        'neon-cyan': '0 0 12px rgba(0, 245, 255, 0.55), 0 0 32px rgba(0, 245, 255, 0.25)',
        'neon-magenta': '0 0 12px rgba(255, 0, 170, 0.55), 0 0 32px rgba(255, 0, 170, 0.25)',
        'neon-green': '0 0 10px rgba(57, 255, 20, 0.5), 0 0 28px rgba(57, 255, 20, 0.2)',
        'neon-purple': '0 0 12px rgba(157, 78, 221, 0.55), 0 0 32px rgba(157, 78, 221, 0.25)',
        'neon-yellow': '0 0 10px rgba(255, 230, 0, 0.5), 0 0 28px rgba(255, 230, 0, 0.2)',
        'panel': '0 0 0 1px rgba(0, 245, 255, 0.18), 0 8px 32px rgba(0, 0, 0, 0.6)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(rgba(0,245,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.04) 1px, transparent 1px)',
        'scanlines':
          'repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px)',
      },
      backgroundSize: {
        'grid-32': '32px 32px',
      },
      animation: {
        'glitch': 'glitch 700ms infinite',
        'scanline': 'scanline 8s linear infinite',
        'flicker': 'flicker 3s infinite',
        'cursor-blink': 'cursor-blink 1s step-end infinite',
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
      },
      keyframes: {
        'glitch': {
          '0%,100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'flicker': {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.92' },
        },
        'cursor-blink': {
          '0%,50%': { opacity: '1' },
          '50.01%,100%': { opacity: '0' },
        },
        'pulse-neon': {
          '0%,100%': { boxShadow: '0 0 8px rgba(0,245,255,0.4)' },
          '50%': { boxShadow: '0 0 24px rgba(0,245,255,0.85)' },
        },
      },
    },
  },
}
