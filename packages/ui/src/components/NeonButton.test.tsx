import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { NeonButton } from './NeonButton'

describe('neonButton', () => {
  it('renders a button with its children', () => {
    render(<NeonButton>Click me</NeonButton>)
    const btn = screen.getByRole('button', { name: 'Click me' })
    expect(btn).toBeInTheDocument()
  })

  it('defaults to type="button"', () => {
    render(<NeonButton>Default</NeonButton>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('applies cyan variant and md size classes by default', () => {
    render(<NeonButton>Styled</NeonButton>)
    const cls = screen.getByRole('button').className
    expect(cls).toContain('text-neon-cyan')
    expect(cls).toContain('px-4')
  })

  it('applies the sm size when requested', () => {
    render(<NeonButton size="sm">Small</NeonButton>)
    expect(screen.getByRole('button').className).toContain('px-3')
  })

  it('forwards click events', () => {
    const onClick = vi.fn()
    render(<NeonButton onClick={onClick}>Press</NeonButton>)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
