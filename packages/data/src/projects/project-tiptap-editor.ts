import type { ProjectItem } from '../types'

export const projectTiptapEditor: ProjectItem = {
  slug: 'tiptap-editor-rebuild',
  name: {
    zh: '基于 Tiptap 的富文本编辑器内核重构',
    en: 'Tiptap-based Rich-Text Editor Core Rebuild',
  },
  tagline: {
    zh: '从 CKEditor5 迁移到 Tiptap，建立可持续演进的编辑器内核',
    en: 'Migrating from CKEditor5 to Tiptap — building an evolvable editor core',
  },
  description: {
    zh: '原系统使用 CKEditor5 承载富文本能力，但深度业务定制、AI 能力接入和长期维护成本较高。基于 Tiptap / ProseMirror 重新设计编辑器内核，覆盖扩展体系、命令系统、NodeView、内容序列化、历史数据兼容等核心模块，从黑盒组件升级为可持续演进的内核架构。',
    en: 'The legacy editor was built on CKEditor5 and proved expensive to customize, extend with AI features, and maintain. Rebuilt the editor core on Tiptap / ProseMirror — covering extension system, command pipeline, NodeView rendering, content serialization, and a CKEditor5 → new-schema migration path — turning the editor from a black-box component into an evolvable architecture.',
  },
  startDate: '2025-01',
  techStack: ['TypeScript', 'Tiptap', 'ProseMirror', 'CKEditor5', 'Vue'],
  highlights: [
    {
      zh: '设计基于 Extension 的扩展体系，统一节点、标记、命令、快捷键、输入规则与插件',
      en: 'Designed an Extension-based plugin system unifying nodes, marks, commands, shortcuts, input rules and plugins',
    },
    {
      zh: '实现表格、图片、附件、代码块、Mention、Slash Command 等复杂节点与 NodeView 渲染',
      en: 'Implemented complex nodes (tables, images, attachments, code blocks, Mention, Slash Command) with NodeView rendering',
    },
    {
      zh: '设计 CKEditor5 历史内容到新 schema 的兼容与转换方案，保障数据无损迁移',
      en: 'Designed a content migration pipeline from CKEditor5 to the new schema with lossless conversion',
    },
    {
      zh: '优化大文档编辑、频繁 transaction 与复杂节点渲染的性能',
      en: 'Optimized perf for large documents, high-frequency transactions and complex node rendering',
    },
    {
      zh: '为后续 AI 写作、智能改写、内容生成、Slash Command 等能力预留扩展机制',
      en: 'Reserved extension hooks for AI writing, rewriting, content generation and Slash Command features',
    },
  ],
  archDiagram: {
    nodes: [
      { id: 'schema', label: 'Schema', x: 0.12, y: 0.5 },
      { id: 'extensions', label: 'Extensions', x: 0.36, y: 0.3 },
      { id: 'commands', label: 'Commands', x: 0.36, y: 0.7 },
      { id: 'core', label: 'ProseMirror Core', x: 0.62, y: 0.5 },
      { id: 'nodeview', label: 'NodeView', x: 0.86, y: 0.3 },
      { id: 'serializer', label: 'Serializer', x: 0.86, y: 0.7 },
    ],
    edges: [
      { from: 'schema', to: 'extensions' },
      { from: 'schema', to: 'commands' },
      { from: 'extensions', to: 'core' },
      { from: 'commands', to: 'core' },
      { from: 'core', to: 'nodeview' },
      { from: 'core', to: 'serializer' },
    ],
  },
  media: { videoCompositionId: 'ProjectShowcase' },
  codeSnippet: {
    language: 'typescript',
    code: `export const SlashCommand = Extension.create({
  name: 'slashCommand',
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        char: '/',
        command: ({ editor, range, props }) => {
          props.command({ editor, range })
        },
        items: ({ query }) => searchCommands(query),
      }),
    ]
  },
})`,
  },
}
