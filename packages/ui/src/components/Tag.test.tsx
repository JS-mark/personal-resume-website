import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Tag } from './Tag'

describe('tag', () => {
  it('renders its children text', () => {
    render(<Tag>TypeScript</Tag>)
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('applies the default (cyan) variant class', () => {
    render(<Tag>Default</Tag>)
    expect(screen.getByText('Default').className).toContain('text-neon-cyan')
  })

  it('applies the requested variant class', () => {
    render(<Tag variant="magenta">Magenta</Tag>)
    const el = screen.getByText('Magenta')
    expect(el.className).toContain('text-neon-magenta')
    expect(el.className).not.toContain('text-neon-cyan')
  })

  it('merges a custom className', () => {
    render(<Tag className="custom-class">Withclass</Tag>)
    expect(screen.getByText('Withclass').className).toContain('custom-class')
  })
})
