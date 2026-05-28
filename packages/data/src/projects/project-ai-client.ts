import type { ProjectItem } from '../types'

export const projectAiClient: ProjectItem = {
  slug: 'ai-client',
  name: {
    zh: 'AI 应用客户端',
    en: 'AI Application Client',
  },
  tagline: {
    zh: '面向多模型对话、Prompt 工作流和工具调用的桌面 AI 客户端',
    en: 'Desktop AI client for multi-model chat, prompt workflows and tool use',
  },
  description: {
    zh: '基于 Cherry Studio 形态构建 AI 应用客户端，覆盖多模型接入、会话管理、流式响应、Prompt 模板、文件上下文与工具调用等核心能力，提供稳定可扩展的 AI 交互体验。',
    en: 'Built a Cherry-Studio–style desktop AI client covering multi-model access, conversation management, streaming responses, prompt templates, file context and tool calls — delivering a stable, extensible AI interaction surface.',
  },
  startDate: '2025-10',
  techStack: ['TypeScript', 'React', 'Electron', 'OpenAI', 'Claude API', 'SSE'],
  highlights: [
    {
      zh: '抽象模型配置、会话、消息、附件、Prompt、工具调用等核心数据结构',
      en: 'Abstracted core data models for providers, conversations, messages, attachments, prompts and tool calls',
    },
    {
      zh: '基于 SSE / fetch stream / AbortController 实现流式响应，支持停止生成、失败重试与错误恢复',
      en: 'Implemented streaming via SSE / fetch stream / AbortController with stop, retry and error recovery',
    },
    {
      zh: '完成 Markdown / 代码块 / 引用来源 / 文件上下文 / RAG 等 AI 消息渲染',
      en: 'Built AI message rendering for Markdown, code blocks, citations, file context and RAG outputs',
    },
    {
      zh: '设计 Prompt 模板与变量机制，沉淀常用 AI 工作流',
      en: 'Designed a prompt template + variable system to codify reusable AI workflows',
    },
    {
      zh: '关注模型输出安全，处理 XSS、不可信内容隔离与编辑器边界',
      en: 'Hardened against unsafe model output: XSS prevention, untrusted content sandboxing, editor boundary protection',
    },
  ],
  archDiagram: {
    nodes: [
      { id: 'ui', label: 'Chat UI', x: 0.1, y: 0.5 },
      { id: 'session', label: 'Session Store', x: 0.34, y: 0.3 },
      { id: 'stream', label: 'Streaming', x: 0.34, y: 0.7 },
      { id: 'prompt', label: 'Prompt Engine', x: 0.6, y: 0.3 },
      { id: 'tools', label: 'Tool Calls', x: 0.6, y: 0.7 },
      { id: 'providers', label: 'Model Providers', x: 0.88, y: 0.5 },
    ],
    edges: [
      { from: 'ui', to: 'session' },
      { from: 'ui', to: 'stream' },
      { from: 'session', to: 'prompt' },
      { from: 'stream', to: 'providers' },
      { from: 'prompt', to: 'providers' },
      { from: 'tools', to: 'providers' },
      { from: 'providers', to: 'stream' },
    ],
  },
  media: { videoCompositionId: 'ProjectShowcase' },
  codeSnippet: {
    language: 'typescript',
    code: `export async function* streamChat(req: ChatRequest, signal: AbortSignal) {
  const res = await fetch(req.url, {
    method: 'POST',
    body: JSON.stringify(req.body),
    signal,
  })
  const reader = res.body!.getReader()
  const decoder = new TextDecoder()
  for (;;) {
    const { value, done } = await reader.read()
    if (done) return
    yield parseSseChunk(decoder.decode(value, { stream: true }))
  }
}`,
  },
}
