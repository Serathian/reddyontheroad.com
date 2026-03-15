import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SplitLayout from '@/app/components/SplitLayout/SplitLayout'

describe('SplitLayout', () => {
  it('renders map and content panes', () => {
    render(
      <SplitLayout
        map={<div data-testid="map">Map Content</div>}
        content={<div data-testid="content">Journal Content</div>}
      />
    )
    
    expect(screen.getByTestId('map')).toBeInTheDocument()
    expect(screen.getByTestId('content')).toBeInTheDocument()
  })

  it('applies correct ARIA label to map pane', () => {
    render(
      <SplitLayout
        map={<div>Map</div>}
        content={<div>Content</div>}
      />
    )
    
    const mapPane = screen.getByLabelText('Map view')
    expect(mapPane).toBeInTheDocument()
    expect(mapPane.tagName).toBe('ASIDE')
  })

  it('renders content in main element', () => {
    render(
      <SplitLayout
        map={<div>Map</div>}
        content={<div data-testid="content">Content</div>}
      />
    )
    
    const main = screen.getByRole('main')
    expect(main).toContainElement(screen.getByTestId('content'))
  })

  it('accepts complex ReactNode children', () => {
    const mapContent = (
      <div>
        <h2>Map Title</h2>
        <div>Map content</div>
      </div>
    )
    
    const journalContent = (
      <article>
        <h1>Day 1</h1>
        <p>Content</p>
      </article>
    )
    
    const { container } = render(
      <SplitLayout map={mapContent} content={journalContent} />
    )
    
    expect(container.textContent).toContain('Map Title')
    expect(container.textContent).toContain('Day 1')
  })
})
