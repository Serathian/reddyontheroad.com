import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Static WIP landing page', () => {
  it('renders the work-in-progress heading, badge, and overview copy inside main', () => {
    render(<Home />)

    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByText('Work in Progress')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: 'Reddy on the Road' })).toBeInTheDocument()
    expect(screen.getByText('Overland Dispatches & Field Journal')).toBeInTheDocument()
    expect(
      screen.getByText(/currently overhauling the travel scrapbook and GPS route mapping experience/i),
    ).toBeInTheDocument()
  })

  it('renders external companion site links and the /journal prototype link', () => {
    render(<Home />)

    const jakeReddyLink = screen.getByRole('link', { name: 'Visit Jake-Reddy.com' })
    expect(jakeReddyLink).toHaveAttribute('href', 'https://jake-reddy.com')
    expect(jakeReddyLink).toHaveAttribute('target', '_blank')
    expect(jakeReddyLink).toHaveAttribute('rel', 'noopener noreferrer')

    const nerdLink = screen.getByRole('link', { name: 'Nerd in the Forest' })
    expect(nerdLink).toHaveAttribute('href', 'https://nerdintheforest.com')
    expect(nerdLink).toHaveAttribute('target', '_blank')
    expect(nerdLink).toHaveAttribute('rel', 'noopener noreferrer')

    const prototypeLink = screen.getByRole('link', { name: 'Explore the Journal Prototype' })
    expect(prototypeLink).toHaveAttribute('href', '/journal')
  })
})
