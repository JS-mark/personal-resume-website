/**
 * 仅供 apps/web 通过 workspace 引用的导出。
 * 不在此处 registerRoot —— 注册放在 ./index.ts，仅由 Remotion CLI 加载。
 */

export { CareerTimeline } from './compositions/CareerTimeline/CareerTimeline'
export {
  careerTimelineDefaults,
  careerTimelineSchema,
} from './compositions/CareerTimeline/schema'
export type { CareerTimelineProps } from './compositions/CareerTimeline/schema'

export { ContactCard } from './compositions/ContactCard/ContactCard'
export {
  contactCardDefaults,
  contactCardSchema,
} from './compositions/ContactCard/schema'
export type { ContactCardProps } from './compositions/ContactCard/schema'

export { HeroIntro } from './compositions/HeroIntro/HeroIntro'
export {
  heroIntroDefaults,
  heroIntroSchema,
} from './compositions/HeroIntro/schema'
export type { HeroIntroProps } from './compositions/HeroIntro/schema'

export { ProjectShowcase } from './compositions/ProjectShowcase/ProjectShowcase'
export {
  projectShowcaseDefaults,
  projectShowcaseSchema,
} from './compositions/ProjectShowcase/schema'
export type { ProjectShowcaseProps } from './compositions/ProjectShowcase/schema'

export {
  skillsShowcaseDefaults,
  skillsShowcaseSchema,
} from './compositions/SkillsShowcase/schema'
export type { SkillsShowcaseProps } from './compositions/SkillsShowcase/schema'
export { SkillsShowcase } from './compositions/SkillsShowcase/SkillsShowcase'

/** 各 composition 的元数据：网站端用来设定 Player 尺寸/帧率/时长 */
export const compositionMeta = {
  HeroIntro: { fps: 30, width: 1920, height: 1080, durationInFrames: 300 },
  SkillsShowcase: { fps: 30, width: 1920, height: 1080, durationInFrames: 450 },
  ProjectShowcase: { fps: 30, width: 1920, height: 1080, durationInFrames: 600 },
  CareerTimeline: { fps: 30, width: 1920, height: 1080, durationInFrames: 540 },
  ContactCard: { fps: 30, width: 1920, height: 1080, durationInFrames: 210 },
} as const
