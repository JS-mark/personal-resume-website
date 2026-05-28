import type { Config } from 'tailwindcss'
import { cyberpunkPreset } from '@resume/ui/tailwind-preset'

export default {
  presets: [cyberpunkPreset as Config],
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
} satisfies Config
