import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'app',
  typescript: true,
  react: true,
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: false,
  },
  ignores: [
    '**/dist/**',
    '**/out/**',
    '**/.turbo/**',
    '**/public/videos/**',
    '**/public/manifest.json',
    'apps/web/public/fonts/**',
    // Lottie 动画数据是外部生成的 minified JSON，不该套我们的 jsonc 规则
    '**/*.lottie.json',
  ],
}, {
  rules: {
    'antfu/no-top-level-await': 'off',
    'node/prefer-global/process': 'off',
    'react-refresh/only-export-components': 'off',
  },
})
