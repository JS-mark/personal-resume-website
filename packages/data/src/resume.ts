import type { Resume } from './types'
import { projects } from './projects'

/**
 * 简历主数据。
 * 替换为自己的内容即可作为通用模板使用，所有视图与 Remotion 视频会自动消费。
 */
export const resume: Resume = {
  $schema: 'https://jsonresume.org/schema/',
  basics: {
    name: 'Sun Duo',
    nameLocalized: { zh: '孙铎', en: 'Sun Duo' },
    label: {
      zh: '资深前端工程师 · 富文本编辑器 / 前端工具链 / Electron AI 桌面端',
      en: 'Senior Frontend Engineer · Rich-Text Editors · Tooling · Electron AI Desktop',
    },
    image: '/images/avatar.jpg',
    email: 'sunduo3195@qq.com',
    phone: '+86 186 0029 0021',
    url: 'https://js-mark.com',
    summary: {
      zh: '8 年前端开发经验，深耕富文本编辑器、前端工具链（脚手架 / 组件库 / SDK）与 AI 应用前端三大方向。主导微博长文双端编辑器内核与 wb-cli 脚手架建设，落地 YunUI / Sina UI / hdlUI 等多个组件库；近期基于 Electron + Vercel AI SDK + MCP SDK 自研 AI 桌面客户端 Super Client R，统一接入 12+ 大模型 Provider 并构建 Skill / Agent / MCP 三层工具体系，长期使用 Claude Code 推进 AI 辅助开发工程化。',
      en: '8 years of frontend engineering, focused on rich-text editor internals, frontend tooling (CLIs / component libraries / SDKs) and AI-product frontends. Led the Weibo long-form dual-platform editor core and the wb-cli scaffold, shipped multiple component libraries (YunUI / Sina UI / hdlUI). Recently built Super Client R — an Electron AI desktop client unifying 12+ model providers behind the Vercel AI SDK and a Skill / Agent / MCP tool system; uses Claude Code daily to industrialize AI-assisted development.',
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
      { zh: '> 富文本编辑器内核 · 前端工具链 · AI 桌面客户端', en: '> Editor cores · Frontend tooling · AI desktop clients' },
      { zh: '> Electron + Vercel AI SDK + MCP · 多模型一体化', en: '> Electron + Vercel AI SDK + MCP · unified multi-model' },
      { zh: '> 8 年前端 · 工程深度优先 · Claude Code daily driver', en: '> 8y frontend · depth-first engineering · Claude Code daily driver' },
    ],
  },
  work: [
    {
      name: { zh: '新浪技术（中国）有限公司', en: 'Sina Technology' },
      position: { zh: '资深前端开发工程师', en: 'Senior Frontend Engineer' },
      startDate: '2021-10',
      summary: {
        zh: '负责微博长文富文本编辑器内核与移动端工具链建设，主导 0→1 移动 UI 组件库与多端脚手架，并支撑微博 AI 创新业务前端落地。',
        en: 'Owns the Weibo long-form rich-text editor core and the mobile frontend tooling stack — leading the zero-to-one mobile UI component library, multi-platform scaffolds, and frontend support for Weibo AI products.',
      },
      highlights: [
        {
          zh: '负责微博长文编辑器内核设计与优化，实现插件化架构（图文排版、格式转换等），完成 PC / 移动端内核互通，保障双端功能与体验一致',
          en: 'Owned design and optimization of the Weibo long-form editor core — plugin architecture (rich layout, format conversion, ...) plus PC / mobile core interop for consistent dual-platform UX',
        },
        {
          zh: '设计开发鸿蒙端内 JSB SDK 与 wb-cli 脚手架，支撑多端应用快速初始化与构建，提升开发效率 30%+',
          en: 'Designed and shipped the HarmonyOS in-app JSB SDK and the wb-cli scaffold — multi-platform bootstrap and build pipeline, +30% dev velocity',
        },
        {
          zh: '推进移动前端业务脚手架升级重构，优化依赖管理与构建流程，构建速度提升 48%',
          en: 'Drove the upgrade/rewrite of the mobile business scaffold — dependency hygiene + build-pipeline overhaul cut build time by 48%',
        },
        {
          zh: '主导新浪移动 UI 组件库从 0 到 1 搭建，统一微博、新浪新闻等业务视觉标准，覆盖 80% 移动端场景',
          en: 'Led zero-to-one build of the Sina Mobile UI component library — unified visual standards across Weibo / Sina News, covering 80% of mobile surfaces',
        },
        {
          zh: '参与内部 AI 平台需求开发，支撑微博 AI 创新业务前端交互；配合搜索 / 推荐业务优化前端数据埋点，提升 AI 推荐准确性',
          en: 'Contributed to the internal AI platform — frontends for Weibo AI initiatives plus instrumentation tuning for search/recommendation models',
        },
        {
          zh: '微博长文首次实现双端编辑器互通，用户编辑体验评分提升 25%；移动通用 UI 组件库上线后新业务开发周期缩短 40%',
          en: 'First-ever dual-platform Weibo long-form editor interop (+25% editing-UX score); shipping the mobile UI library cut new-feature dev cycle by 40%',
        },
        {
          zh: '获 2022 年度新浪移动优秀员工；新浪新闻冬奥小游戏首次上线并获公司认可',
          en: 'Awarded 2022 Sina Mobile Outstanding Engineer; shipped the Sina News Winter-Olympics mini-game with company recognition',
        },
      ],
      techStack: ['TypeScript', 'React', 'Vue', 'ProseMirror', 'Webpack', 'Vite', 'Node.js', 'HarmonyOS JSB'],
      metrics: [
        { label: { zh: '编辑体验评分', en: 'Editor UX score' }, value: '+25%' },
        { label: { zh: '构建速度', en: 'Build speed' }, value: '+48%' },
        { label: { zh: '组件库覆盖', en: 'UI library coverage' }, value: '80%' },
        { label: { zh: '新业务开发周期', en: 'New-feature cycle' }, value: '-40%' },
      ],
    },
    {
      name: { zh: '北京读我科技有限公司', en: 'Duwo Technology (Banyu)' },
      position: { zh: '高级前端开发工程师', en: 'Senior Frontend Engineer' },
      startDate: '2020-09',
      endDate: '2021-09',
      summary: {
        zh: '伴鱼启蒙业务前端核心开发，负责 AI 课程编辑器、cocos 游戏组件管理平台、素材管理系统及多个全公司复用的工具链。',
        en: 'Core frontend at Banyu Kids — built the AI course-authoring editor, the cocos game-component platform, the asset-management system, and several company-wide tooling libraries.',
      },
      highlights: [
        {
          zh: '负责 AI 课程编辑器开发，设计课件编辑核心功能（音视频素材插入、题型组件联动），优化与 AI 题型组件的联调方式，提升开发效率 30%',
          en: 'Built the AI course-authoring editor — slide editing core (audio/video insert, question-type component coupling) with a streamlined AI-component integration flow, +30% dev velocity',
        },
        {
          zh: '开发 H5 唤醒 app npm 库与素材管理库，推广至全公司使用，业务开发提效 50%+',
          en: 'Shipped the H5-to-app deep-link npm library and the asset-management library — adopted company-wide, lifting business dev velocity by 50%+',
        },
        {
          zh: '设计开发 cocos 游戏组件管理平台（支持版本管控、灰度发布、白名单、上下线），统一题型组件治理，研发提效近 60%',
          en: 'Designed and built the cocos game-component management platform (versioning, canary, allowlist, lifecycle) — unified component governance, ~60% dev velocity gain',
        },
        {
          zh: '设计开发素材管理系统，统一音视频 / 图片处理流程，提供插件机制，方便题型组件调用',
          en: 'Built the asset-management system — unified audio/video/image pipelines with a plugin layer for question-type components',
        },
        {
          zh: '获 2021 Q2 季度技术分享优秀课件奖；H5 可视化系统模组组件支撑活动页面快速搭建，上线效率提升 3 倍',
          en: 'Awarded 2021 Q2 Best Tech-Talk Material; the H5 visual builder modules tripled campaign-page launch velocity',
        },
      ],
      techStack: ['TypeScript', 'Vue', 'React', 'Cocos', 'Webpack', 'Node.js'],
      metrics: [
        { label: { zh: '组件平台研发提效', en: 'Platform dev velocity' }, value: '+60%' },
        { label: { zh: '业务开发提效', en: 'Business dev velocity' }, value: '+50%' },
        { label: { zh: '活动页上线效率', en: 'Campaign launch speed' }, value: '3x' },
      ],
    },
    {
      name: { zh: '北京云集智造科技有限公司', en: 'Yunji Zhizao' },
      position: { zh: '前端 Leader', en: 'Frontend Lead' },
      startDate: '2020-03',
      endDate: '2020-08',
      summary: {
        zh: '主导云告警平台 V2 前端架构与 V1 重构，提炼 YunUI 组件库，构建与渲染性能多维优化。',
        en: 'Led architecture for the V2 cloud-alerting platform and the V1 rewrite — extracted the YunUI component library and shipped multi-dimensional build/runtime perf wins.',
      },
      highlights: [
        {
          zh: '主导云告警平台 V2 架构设计，重构 V1 系统前端代码，提炼 Vue PC 端 UI 组件库为独立 npm 包（YunUI 1.0），支撑公司 2 个核心系统',
          en: 'Led V2 cloud-alerting platform architecture and the V1 frontend rewrite — extracted Vue PC UI library as a standalone npm package (YunUI 1.0) powering 2 core systems',
        },
        {
          zh: '优化页面加载策略（关键资源预加载等），首屏渲染速度提升 80%',
          en: 'Tuned page-load strategy with critical-resource preloading — first-paint +80%',
        },
        {
          zh: '优化构建流程，将打包时间从 3m50s 压缩至 58s，开发体验显著提升',
          en: 'Cut build time from 3m50s to 58s through pipeline optimization — measurable DX win',
        },
        {
          zh: 'YunUI 组件库复用率达 70%，减少重复开发量；系统重构后线上 bug 率下降 40%',
          en: 'YunUI reuse rate hit 70% (less duplicated UI code); rewrite cut production-bug rate by 40%',
        },
      ],
      techStack: ['Vue', 'TypeScript', 'Webpack', 'Less', 'Node.js'],
      metrics: [
        { label: { zh: '首屏渲染', en: 'First paint' }, value: '+80%' },
        { label: { zh: '构建时间', en: 'Build time' }, value: '3m50s → 58s' },
        { label: { zh: '组件复用率', en: 'Component reuse' }, value: '70%' },
        { label: { zh: '线上 bug 率', en: 'Prod bug rate' }, value: '-40%' },
      ],
    },
    {
      name: { zh: '海底捞国际控股有限公司', en: 'Haidilao International Holding' },
      position: { zh: '前端开发工程师', en: 'Frontend Engineer' },
      startDate: '2018-01',
      endDate: '2020-02',
      summary: {
        zh: '海底捞内部业务前端核心开发，主导 hdlUI 组件库与前端工程化体系，搭建基于 GitLab + Jenkins 的 CI/CD 平台。',
        en: 'Core frontend on Haidilao internal systems — led the hdlUI component library and the engineering-quality stack, and stood up the GitLab + Jenkins CI/CD platform.',
      },
      highlights: [
        {
          zh: '主导基于 Vue 2.x 的 UI 组件库开发，支撑内部券管理系统、APP 运营后台等 10+ 项目快速迭代，获公司 "UI 组件开发优秀奖"',
          en: 'Led Vue 2.x UI library development — powered 10+ internal projects (coupon ops, app back-office, ...) and earned the company\'s "Outstanding UI Component" award',
        },
        {
          zh: '推动前端工程化建设：搭建 eslint 规范库、制定 commit 提交标准，编写自动化脚本优化开发流程',
          en: 'Drove engineering quality — eslint rule package, commit conventions, automation scripts to streamline dev workflow',
        },
        {
          zh: '主导基于 GitLab + Jenkins 的 CI/CD 平台搭建，实现代码提交后自动构建部署',
          en: 'Stood up the GitLab + Jenkins CI/CD platform — automatic build & deploy on every commit',
        },
        {
          zh: '参与超级 App（海底捞社交类移动应用）核心模块前端架构搭建，开发 Hi-JSBridge SDK，统一 app 端能力对接 H5',
          en: 'Architected core modules of the Haidilao Super App (social mobile) and shipped the Hi-JSBridge SDK to standardize app-to-H5 capability bridging',
        },
        {
          zh: '获 2018 年度优秀员工奖、多次季度优秀员工，相关工具被全公司推广使用',
          en: 'Earned 2018 Annual Outstanding Employee + multiple quarterly awards; tooling adopted company-wide',
        },
      ],
      techStack: ['JavaScript', 'Vue', 'Weex', 'Webpack', 'ESLint', 'GitLab CI', 'Jenkins', 'Docker'],
    },
  ],
  education: [
    {
      institution: { zh: '北京外国语大学', en: 'Beijing Foreign Studies University' },
      area: { zh: '电子商务技术', en: 'E-commerce Technology' },
      studyType: { zh: '本科', en: 'Bachelor' },
      startDate: '2015-09',
      endDate: '2018-07',
    },
  ],
  skills: [
    // 语言
    { name: 'TypeScript', category: 'language', level: 5, yearsExperience: 8 },
    { name: 'JavaScript', category: 'language', level: 5, yearsExperience: 8 },
    { name: 'Less/Scss', category: 'language', level: 4, yearsExperience: 7 },
    // 前端框架
    { name: 'Vue', category: 'framework', level: 5, yearsExperience: 7 },
    { name: 'React', category: 'framework', level: 4, yearsExperience: 5 },
    { name: 'Node.js', category: 'framework', level: 4, yearsExperience: 6 },
    // 桌面端
    {
      name: 'Electron',
      category: 'framework',
      level: 4,
      yearsExperience: 2,
      keywords: [
        { zh: 'electron-vite / electron-builder / IPC / 主进程 Koa 服务', en: 'electron-vite, electron-builder, IPC, main-process Koa server' },
      ],
    },
    {
      name: 'Tauri',
      category: 'framework',
      level: 3,
      yearsExperience: 1,
      keywords: [
        { zh: 'Tauri + Vue3 hybrid 桌面应用（switchHostsR）', en: 'Tauri + Vue3 hybrid desktop apps (switchHostsR)' },
      ],
    },
    // 富文本编辑器
    { name: 'ProseMirror', category: 'framework', level: 4, yearsExperience: 3 },
    { name: 'Tiptap', category: 'framework', level: 4, yearsExperience: 2 },
    // AI 工具链
    {
      name: 'MCP (Model Context Protocol)',
      category: 'framework',
      level: 4,
      yearsExperience: 1,
      keywords: [
        { zh: '@modelcontextprotocol/sdk · Bridgent · 本地/远程 MCP 服务编排', en: '@modelcontextprotocol/sdk · Bridgent · local & remote MCP orchestration' },
      ],
    },
    {
      name: 'Claude Agent SDK',
      category: 'framework',
      level: 4,
      yearsExperience: 1,
      keywords: [
        { zh: 'Skill / Agent / Tool 工具体系集成', en: 'Skill / Agent / Tool system integration' },
      ],
    },
    {
      name: 'Claude Code',
      category: 'tool',
      level: 5,
      yearsExperience: 1,
      keywords: [
        { zh: '日常工程化 · 自定义 skill / hook / sub-agent', en: 'Daily engineering · custom skills / hooks / sub-agents' },
      ],
    },
    // 构建 / 工程化
    { name: 'Webpack', category: 'tool', level: 5, yearsExperience: 7 },
    { name: 'Vite', category: 'tool', level: 5, yearsExperience: 3 },
    { name: 'Rollup', category: 'tool', level: 4, yearsExperience: 3 },
    { name: 'ESLint', category: 'tool', level: 5, yearsExperience: 6 },
    { name: 'Docker', category: 'tool', level: 3, yearsExperience: 4 },
  ],
  projects,
  meta: {
    version: '1.0.0',
    lastModified: new Date().toISOString(),
    canonical: 'https://js-mark.com',
    credits: {
      author: { zh: '孙铎', en: 'Sun Duo' },
      sourceUrl: 'https://github.com/js-mark/personal-resume-website',
      license: 'MIT',
      openSource: true,
    },
  },
}
