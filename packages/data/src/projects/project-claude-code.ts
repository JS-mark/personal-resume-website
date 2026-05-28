import type { ProjectItem } from '../types'

export const projectClaudeCode: ProjectItem = {
  slug: 'claude-code-workflow',
  name: {
    zh: 'Claude Code AI 工程化实践',
    en: 'Claude Code AI-Assisted Engineering',
  },
  tagline: {
    zh: '把 AI 编码工具沉淀成可复用的 Skill 与 Prompt 模板',
    en: 'Distilling AI coding into reusable Skills and prompt templates',
  },
  description: {
    zh: '长期使用 Claude Code 构建 AI 辅助开发流程，沉淀面向需求拆解、代码生成、重构、测试、文档与代码审查的 Skill 和 Prompt 模板，并建立 AI 输出质量控制机制，覆盖类型安全、边界场景、可维护性与安全风险。',
    en: 'A long-running practice using Claude Code to build AI-assisted dev workflows. Codified Skills + prompt templates for task breakdown, codegen, refactor, test, docs and code review — with quality-control guardrails covering type safety, edge cases, maintainability and security.',
  },
  startDate: '2025-10',
  techStack: ['Claude Code', 'TypeScript', 'Node.js', 'AI Skills', 'Prompt Engineering'],
  highlights: [
    {
      zh: '设计面向特定任务的 Skill，规范 AI 在代码生成、审查、项目分析等场景下的行为',
      en: 'Designed task-specific Skills to constrain AI behavior in codegen, review and project analysis',
    },
    {
      zh: '建立 AI 辅助开发流程：任务拆解 → 上下文加载 → 代码生成 → 人工审查 → 测试验证',
      en: 'Established an AI-assisted dev loop: task breakdown → context load → codegen → human review → test',
    },
    {
      zh: '沉淀常用 Prompt 模板与开发规范，提升 AI 输出稳定性',
      en: 'Codified prompt templates and conventions to stabilize AI output across tasks',
    },
    {
      zh: '建立 AI 生成代码的质量控制：类型安全、边界场景、可维护性与安全性',
      en: 'Set up quality controls on AI code: type safety, edge cases, maintainability, security',
    },
    {
      zh: '使用 AI 辅助分析复杂代码库，提升问题定位、重构规划与方案验证效率',
      en: 'Used AI to navigate complex codebases — speeding up bug triage, refactor planning and design validation',
    },
  ],
  archDiagram: {
    nodes: [
      { id: 'task', label: 'Task Breakdown', x: 0.12, y: 0.5 },
      { id: 'context', label: 'Context Load', x: 0.36, y: 0.5 },
      { id: 'skills', label: 'Skills', x: 0.6, y: 0.3 },
      { id: 'codegen', label: 'Codegen', x: 0.6, y: 0.7 },
      { id: 'review', label: 'Human Review', x: 0.84, y: 0.3 },
      { id: 'test', label: 'Test Verify', x: 0.84, y: 0.7 },
    ],
    edges: [
      { from: 'task', to: 'context' },
      { from: 'context', to: 'skills' },
      { from: 'context', to: 'codegen' },
      { from: 'skills', to: 'codegen' },
      { from: 'codegen', to: 'review' },
      { from: 'review', to: 'test' },
    ],
  },
  media: { videoCompositionId: 'ProjectShowcase' },
  codeSnippet: {
    language: 'markdown',
    code: `---
name: parse-resume-md
description: Parse a Chinese resume Markdown into typed Resume data.
---

## Steps
1. Read packages/data/src/types.ts for the Resume contract.
2. Parse markdown sections into structured data.
3. Translate every LocalizedString to English.
4. Write resume.ts and run \`pnpm typecheck\` until green.`,
  },
}
