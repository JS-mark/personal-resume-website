import type { LottieAnimationData } from '@remotion/lottie'
import type { CSSProperties } from 'react'
import { Lottie } from '@remotion/lottie'
import animationData from './cat.lottie.json'

/**
 * Lottie 猫咪宠物动画。
 * JSON 直接 import 进来由打包器处理（Vite for web、webpack for Remotion CLI），
 * 避免 staticFile 在两个 app 公共目录之间不一致的问题。
 *
 * 想换其它动画：从 lottiefiles.com 下载 .json 替换 cat.lottie.json 即可。
 */
export function LottieCat({ size = 280, style }: { size?: number, style?: CSSProperties }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        ...style,
      }}
    >
      <Lottie
        animationData={animationData as LottieAnimationData}
        loop
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
