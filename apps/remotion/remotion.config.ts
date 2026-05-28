import { Config } from '@remotion/cli/config'
import { enableTailwind } from '@remotion/tailwind'

Config.setVideoImageFormat('jpeg')
Config.setConcurrency(2)
Config.setOverwriteOutput(true)
Config.setEntryPoint('./src/index.ts')

// 用官方 @remotion/tailwind 把 Tailwind 接入 Remotion 的 webpack；
// 它会自动找到 ./tailwind.config.ts 与 ./postcss.config.js
Config.overrideWebpackConfig(current => enableTailwind(current))
