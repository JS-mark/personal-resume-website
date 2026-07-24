import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProgressBar } from './ProgressBar'

describe('progressBar', () => {
  it('renders the label and rightLabel text', () => {
    render(<ProgressBar value={0.5} label="Vue" rightLabel="Expert" />)
    expect(screen.getByText('Vue')).toBeInTheDocument()
    expect(screen.getByText('Expert')).toBeInTheDocument()
  })

  it('sets the fill width to the percentage of value (default style)', () => {
    const { container } = render(<ProgressBar value={0.42} />)
    const fill = container.querySelector('[style*="width"]') as HTMLElement | null
    expect(fill).not.toBeNull()
    expect(fill!.style.width).toBe('42%')
  })

  it('clamps values above 1 to 100%', () => {
    const { container } = render(<ProgressBar value={5} />)
    const fill = container.querySelector('[style*="width"]') as HTMLElement
    expect(fill.style.width).toBe('100%')
  })

  it('clamps negative values to 0%', () => {
    const { container } = render(<ProgressBar value={-3} />)
    const fill = container.querySelector('[style*="width"]') as HTMLElement
    expect(fill.style.width).toBe('0%')
  })

  it('renders 20 segments in segmented mode instead of a fill bar', () => {
    const { container } = render(<ProgressBar value={0.5} segmented />)
    // segmented 模式渲染 20 个格子，不应有 inline width 的填充条。
    expect(container.querySelector('[style*="width"]')).toBeNull()
    const segments = container.querySelectorAll('span.h-3')
    expect(segments).toHaveLength(20)
  })
})
