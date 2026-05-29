import type { Resume } from './types'
import { projects } from './projects'

/**
 * 简历主数据。
 * 替换为自己的内容即可作为通用模板使用，所有视图与 Remotion 视频会自动消费。
 */
export const resume: Resume = {
  $schema: 'https://jsonresume.org/schema/',
  basics: {
    name: 'JSMark',
    nameLocalized: { zh: '圣痕', en: 'The Mark' },
    label: {
      zh: '资深前端工程师 · AI 应用 / 富文本编辑器',
      en: 'Senior Frontend Engineer · AI Apps · Rich-Text Editor',
    },
    image: '/images/avatar.jpg',
    email: 'sunduo3195@qq.com',
    phone: '+86 186 8888 8888',
    url: 'https://js-mark.com',
    summary: {
      zh: '8 年前端开发经验，专注于复杂 Web 应用、富文本编辑器内核和 AI 应用客户端开发。近期基于 Tiptap / ProseMirror 重构编辑器内核以替代 CKEditor5，并基于 Cherry Studio 形态构建 AI 应用客户端，长期使用 Claude Code 推进 AI 辅助开发工程化。关注前端架构、可扩展性、复杂交互与工程治理。',
      en: '8 years of frontend engineering focused on complex web apps, rich-text editor internals, and AI application clients. Currently rebuilding editor cores on Tiptap / ProseMirror to replace CKEditor5, building Cherry-Studio–style AI desktop clients, and using Claude Code to industrialize AI-assisted development. Bias toward architecture depth, extensibility, complex interactions and engineering governance.',
    },
    location: {
      city: { zh: '北京', en: 'Beijing' },
      countryCode: 'CN',
    },
    profiles: [
      { network: 'GitHub', username: 'js-mark', url: 'https://github.com/js-mark' },
      { network: 'X', username: 'mark', url: 'https://x.com/Js_mark_' },
    ],
    taglines: [
      { zh: '> 把复杂系统拆成可演进的内核', en: '> Turn complex systems into evolvable cores' },
      { zh: '> 富文本编辑器 · AI 应用客户端', en: '> Rich-text editor cores · AI client engineering' },
      { zh: '> 8 年前端 · 工程深度优先', en: '> 8 years frontend · depth-first engineering' },
    ],
  },
  work: [

    {
      name: { zh: '新浪微博', en: 'Weibo' },
      position: { zh: '资深前端工程师', en: 'Senior Frontend Engineer' },
      startDate: '2021-10',
      summary: {
        zh: '负责微博 PC / 移动端复杂业务系统前端开发，推动核心模块与工程化建设。',
        en: 'Owned frontend for complex Weibo PC / mobile surfaces and pushed core-module + tooling work forward.',
      },
      highlights: [
        {
          zh: '负责复杂前端业务系统的开发、架构设计和核心模块建设',
          en: 'Owned development, architecture and core-module work for complex frontend systems',
        },
        {
          zh: '推动业务组件库与公共能力沉淀，统一跨业务前端开发体验',
          en: 'Built shared component library + common capabilities to unify cross-product dev experience',
        },
        {
          zh: '推动前端工程化、代码质量与性能优化体系落地',
          en: 'Drove adoption of engineering, code-quality and perf practices',
        },
      ],
      techStack: ['TypeScript', 'React', 'Webpack', 'Node.js'],
    },
    {
      name: { zh: '伴鱼', en: 'Banyu' },
      position: { zh: '高级前端工程师', en: 'Senior Frontend Engineer' },
      startDate: '2020-09',
      endDate: '2021-10',
      summary: {
        zh: '负责伴鱼前端核心模块建设，主导富文本编辑器内核重构与 AI 应用客户端开发。',
        en: 'Drove core frontend module development at Banyu — leading the rich-text editor core rebuild and the AI desktop client.',
      },
      highlights: [
        {
          zh: '主导基于 Tiptap / ProseMirror 的富文本编辑器内核重构，逐步替代 CKEditor5 编辑能力',
          en: 'Led the Tiptap / ProseMirror–based editor core rebuild, progressively replacing CKEditor5',
        },
        {
          zh: '参与 AI 应用客户端开发，负责多模型对话、流式响应、会话管理与 Prompt 工作流',
          en: 'Built core of the AI desktop client: multi-model chat, streaming, session management, prompt workflows',
        },
        {
          zh: '推动前端工程化、组件化、代码质量、性能优化与 AI 辅助开发流程落地',
          en: 'Championed engineering-quality work: tooling, componentization, perf, and AI-assisted dev workflows',
        },
        {
          zh: '负责复杂前端业务系统的架构设计与核心模块建设',
          en: 'Owned architecture and core-module design for complex frontend product surfaces',
        },
      ],
      techStack: ['TypeScript', 'React', 'Vue', 'Tiptap', 'ProseMirror', 'Vite', 'Electron'],
    },
    {
      name: { zh: '海底捞', en: 'Haidilao' },
      position: { zh: 'Web 前端工程师', en: 'Web Frontend Engineer' },
      startDate: '2018-01',
      endDate: '2020-02',
      summary: {
        zh: '参与海底捞内部业务系统前端开发，从 0 到 1 搭建多个业务模块，推动组件化与工程化实践。',
        en: 'Contributed to internal Haidilao frontend systems — built several business modules from zero and pushed componentization and tooling forward.',
      },
      highlights: [
        {
          zh: '参与多个内部业务系统的前端开发与长期维护',
          en: 'Contributed to several internal business frontends and their long-term maintenance',
        },
        {
          zh: '负责复杂表单、数据可视化等高交互业务场景的前端实现',
          en: 'Implemented complex forms and data-viz for high-interaction business scenarios',
        },
        {
          zh: '推动组件化与工程化实践，提升团队开发效率',
          en: 'Pushed componentization and tooling practices to lift team velocity',
        },
      ],
      techStack: ['JavaScript', 'Vue', 'Webpack', 'jQuery'],
    },
  ],
  education: [],
  skills: [
    // 前端基础
    { name: 'TypeScript', category: 'language', level: 5, yearsExperience: 8 },
    { name: 'JavaScript', category: 'language', level: 5, yearsExperience: 8 },
    { name: 'React', category: 'framework', level: 5, yearsExperience: 7 },
    { name: 'Vue', category: 'framework', level: 4, yearsExperience: 5 },
    { name: 'Node.js', category: 'framework', level: 4, yearsExperience: 6 },
    { name: 'Vite', category: 'tool', level: 5, yearsExperience: 3 },
    { name: 'Webpack', category: 'tool', level: 4, yearsExperience: 6 },
    { name: 'pnpm', category: 'tool', level: 4, yearsExperience: 3 },
    // 富文本编辑器
    { name: 'Tiptap', category: 'framework', level: 4, yearsExperience: 1 },
    { name: 'ProseMirror', category: 'framework', level: 4, yearsExperience: 1 },
    { name: 'CKEditor5', category: 'framework', level: 4, yearsExperience: 2 },
    // AI 应用 & 工程化
    { name: 'Claude Code', category: 'tool', level: 5, yearsExperience: 1 },
    { name: 'AI Engineering', category: 'soft', level: 4, yearsExperience: 1 },
    // 工程能力
    { name: 'Architecture', category: 'soft', level: 5, yearsExperience: 6 },
    { name: 'Mentoring', category: 'soft', level: 4, yearsExperience: 4 },
  ],
  projects,
  meta: {
    version: '1.0.0',
    lastModified: new Date().toISOString(),
    canonical: 'https://js-mark.com',
    credits: {
      author: { zh: 'The Mark', en: 'The Mark' },
      sourceUrl: 'https://github.com/js-mark/personal-resume-website',
      license: 'MIT',
      openSource: true,
    },
  },
}
