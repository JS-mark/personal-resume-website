import type { ProjectItem } from '../types'

export const projectAiClient: ProjectItem = {
  slug: 'ai-client',
  name: {
    zh: 'Super Client R · Electron AI 桌面客户端',
    en: 'Super Client R · Electron AI Desktop Client',
  },
  tagline: {
    zh: '多模型对话 · Agent 工具调用 · MCP 服务管理 · 内嵌本地 HTTP API',
    en: 'Multi-provider chat · Agent tool use · MCP server orchestration · embedded local HTTP API',
  },
  description: {
    zh: '基于 Electron + React + TypeScript 构建的 AI 桌面客户端，统一接入 12+ 大模型 Provider（Anthropic / OpenAI / Google / Bedrock / Azure / Mistral / Perplexity / xAI / OpenRouter 等），通过 @ai-sdk 抽象层提供一致的流式对话体验；集成 Claude Agent SDK、LangChain 与 MCP SDK，支撑可扩展的 Agent / Skill / MCP 工具体系；主进程内嵌 Koa HTTP 服务，将客户端能力暴露给外部脚本。',
    en: 'An Electron + React + TypeScript AI desktop client that unifies 12+ model providers (Anthropic / OpenAI / Google / Bedrock / Azure / Mistral / Perplexity / xAI / OpenRouter, …) behind the Vercel AI SDK abstraction for consistent streaming chat. Integrates the Claude Agent SDK, LangChain and the MCP SDK to power a pluggable Agent / Skill / MCP tool system; the main process embeds a Koa HTTP server that exposes client capabilities to external scripts.',
  },
  startDate: '2025-08',
  url: 'https://github.com/JS-mark/super-client-r',
  repoUrl: 'https://github.com/JS-mark/super-client-r',
  techStack: [
    'Electron',
    'electron-vite',
    'electron-builder',
    'React',
    'TypeScript',
    'Ant Design X',
    'Tailwind CSS',
    'Zustand',
    'Vercel AI SDK',
    'Claude Agent SDK',
    'LangChain',
    'MCP SDK',
    'Koa',
    'better-sqlite3',
    'xterm',
    'Milkdown',
    'CodeMirror',
    'Vite',
  ],
  highlights: [
    {
      zh: '基于 electron-vite 与 pnpm monorepo 组织主进程 / 渲染进程 / 共享类型 / 设备代理 / 中继服务，多包独立构建并通过 electron-builder 出包 mac/win',
      en: 'Organized main / renderer / shared-types / device-agent / relay-server as a pnpm monorepo with electron-vite, then shipped mac/win artifacts via electron-builder',
    },
    {
      zh: '通过 Vercel AI SDK 统一封装 12+ Provider（Anthropic / OpenAI / Google / Bedrock / Azure / Mistral / Perplexity / xAI / OpenRouter / Cerebras / HuggingFace / Vertex），抽象 Provider Registry 与流式响应通道',
      en: 'Unified 12+ providers (Anthropic / OpenAI / Google / Bedrock / Azure / Mistral / Perplexity / xAI / OpenRouter / Cerebras / HuggingFace / Vertex) behind the Vercel AI SDK with a provider-registry + streaming channel abstraction',
    },
    {
      zh: '设计可扩展的 Skill / Agent / MCP 三层工具体系，集成 @anthropic-ai/claude-agent-sdk 与 @modelcontextprotocol/sdk，支持本地 / 远程 MCP 服务的注册、调用与权限边界',
      en: 'Designed a 3-layer tool system (Skill / Agent / MCP) integrating @anthropic-ai/claude-agent-sdk and @modelcontextprotocol/sdk — registration, invocation and permission boundaries for local & remote MCP servers',
    },
    {
      zh: '在主进程内嵌 Koa + @koa/router HTTP 服务，将客户端 AI 能力以 REST API 暴露给外部脚本和 IDE 插件，通过 IPC 层与渲染进程通信',
      en: 'Embedded a Koa + @koa/router HTTP server in the main process, exposing client AI capabilities to external scripts and IDE plugins via REST, with an IPC bridge to the renderer',
    },
    {
      zh: '使用 better-sqlite3 + electron-store 落地本地会话 / 模型配置 / 凭据管理，配合 electron-updater 实现自动更新',
      en: 'Persisted sessions / model configs / credentials via better-sqlite3 + electron-store, with auto-update wired through electron-updater',
    },
    {
      zh: '渲染层采用 Ant Design X + Milkdown + CodeMirror + xterm 组合，覆盖对话、富文本编辑、代码高亮与终端交互场景',
      en: 'Renderer combines Ant Design X + Milkdown + CodeMirror + xterm to cover chat, rich-text editing, code highlighting and embedded terminal interactions',
    },
    {
      zh: '内建 i18n 校验脚本与 oxlint / Biome 双工具链，配合 Vitest 单测与 IPC mock，保障跨进程代码质量',
      en: 'In-house i18n check + oxlint / Biome dual lint pipeline plus Vitest with IPC mocks to keep cross-process code quality in check',
    },
  ],
  archDiagram: {
    nodes: [
      { id: 'renderer', label: 'Renderer (React)', x: 0.1, y: 0.5 },
      { id: 'ipc', label: 'IPC Bridge', x: 0.3, y: 0.5 },
      { id: 'main', label: 'Main Process', x: 0.5, y: 0.3 },
      { id: 'koa', label: 'Koa HTTP API', x: 0.5, y: 0.7 },
      { id: 'aisdk', label: 'AI SDK Registry', x: 0.72, y: 0.3 },
      { id: 'mcp', label: 'MCP / Agent / Skills', x: 0.72, y: 0.7 },
      { id: 'providers', label: '12+ Model Providers', x: 0.92, y: 0.3 },
      { id: 'tools', label: 'Local & Remote Tools', x: 0.92, y: 0.7 },
    ],
    edges: [
      { from: 'renderer', to: 'ipc' },
      { from: 'ipc', to: 'main' },
      { from: 'ipc', to: 'koa' },
      { from: 'main', to: 'aisdk' },
      { from: 'main', to: 'mcp' },
      { from: 'koa', to: 'aisdk' },
      { from: 'koa', to: 'mcp' },
      { from: 'aisdk', to: 'providers' },
      { from: 'mcp', to: 'tools' },
    ],
  },
  media: { videoCompositionId: 'ProjectShowcase' },
  codeSnippet: {
    language: 'typescript',
    code: `import { createAnthropic } from '@ai-sdk/anthropic'
import { createOpenAI } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { Client as McpClient } from '@modelcontextprotocol/sdk/client/index.js'

const registry = {
  anthropic: createAnthropic({ apiKey: env.ANTHROPIC_KEY }),
  openai: createOpenAI({ apiKey: env.OPENAI_KEY }),
} as const

export async function* chat(req: ChatRequest, mcp: McpClient, signal: AbortSignal) {
  const tools = await mcp.listTools()
  const { textStream } = streamText({
    model: registry[req.provider](req.model),
    messages: req.messages,
    tools,
    abortSignal: signal,
  })
  for await (const delta of textStream) yield delta
}`,
  },
}
