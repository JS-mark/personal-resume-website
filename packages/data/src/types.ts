/**
 * 基于 JSON Resume schema 扩展的类型定义。
 * 所有面向用户的文本字段使用 LocalizedString，以支持中英双语。
 */

export type Locale = 'zh' | 'en'

export interface LocalizedString {
  zh: string
  en: string
}

/** JSON Resume basics + 扩展字段 */
export interface ResumeBasics {
  /** 拉丁字母姓名（用作终端 prompt、文件名等） */
  name: string
  /** 本地化全名（中文姓名 / 英文姓名） */
  nameLocalized?: LocalizedString
  /** 职位/头衔 */
  label: LocalizedString
  /** 头像图片 url（建议 /images/ 下） */
  image?: string
  email: string
  phone?: string
  url?: string
  /** 个人简介（一段话） */
  summary: LocalizedString
  location: {
    city: LocalizedString
    countryCode: string
  }
  profiles: Array<{
    network: string
    username: string
    url: string
  }>
  /** 扩展：用于 HeroIntro 终端打字动画的多条 tagline */
  taglines?: LocalizedString[]
}

export interface WorkItem {
  /** 公司名 */
  name: LocalizedString
  /** 职位 */
  position: LocalizedString
  url?: string
  /** ISO yyyy-mm */
  startDate: string
  endDate?: string
  summary: LocalizedString
  highlights: LocalizedString[]
  /** 扩展字段 */
  techStack: string[]
  metrics?: Array<{
    label: LocalizedString
    value: string
  }>
}

export interface EducationItem {
  institution: LocalizedString
  area: LocalizedString
  studyType: LocalizedString
  startDate: string
  endDate?: string
  score?: string
  courses?: LocalizedString[]
}

export type SkillCategory = 'language' | 'framework' | 'tool' | 'platform' | 'soft'

export interface Skill {
  /** 规范名称（保留英文/原始大小写，如 "TypeScript"） */
  name: string
  category: SkillCategory
  /** 1=入门 ~ 5=精通 */
  level: 1 | 2 | 3 | 4 | 5
  /** lucide 图标名称或 url */
  icon?: string
  yearsExperience?: number
  keywords?: LocalizedString[]
}

export interface MediaAssets {
  /** 用于 manifest 查找已渲染视频的 key */
  videoCompositionId?: string
  /** /public/videos/ 下的静态降级路径 */
  mp4Url?: string
  webmUrl?: string
  /** 低带宽场景的 lottie 动画 */
  lottieUrl?: string
  /** 视频海报 */
  posterUrl?: string
}

export interface ArchDiagramNode {
  id: string
  label: string
  /** 在画布中的相对位置（0~1） */
  x?: number
  y?: number
}

export interface ArchDiagramEdge {
  from: string
  to: string
  label?: string
}

export interface ProjectItem {
  /** url path 用，例：'project-aurora' */
  slug: string
  name: LocalizedString
  tagline: LocalizedString
  description: LocalizedString
  startDate: string
  endDate?: string
  url?: string
  repoUrl?: string
  /** 扩展字段 */
  techStack: string[]
  highlights: LocalizedString[]
  metrics?: Array<{
    label: LocalizedString
    value: string
    delta?: string
  }>
  archDiagram?: {
    nodes: ArchDiagramNode[]
    edges: ArchDiagramEdge[]
  }
  media: MediaAssets
  /** ProjectShowcase composition 中的代码扫过片段 */
  codeSnippet?: {
    language: string
    code: string
  }
}

export interface Resume {
  $schema: 'https://jsonresume.org/schema/'
  basics: ResumeBasics
  work: WorkItem[]
  education: EducationItem[]
  skills: Skill[]
  projects: ProjectItem[]
  meta: {
    version: string
    lastModified: string
    canonical: string
    /** footer 配置：作者、开源信息、协议、源码地址 */
    credits?: {
      author: LocalizedString
      sourceUrl?: string
      license?: string
      /** 是否显示「免费开源使用」标语 */
      openSource?: boolean
    }
  }
}
