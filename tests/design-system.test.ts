import { describe, it, expect, beforeAll } from 'vitest'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

describe('Design System CSS Variables', () => {
  let styles: CSSStyleDeclaration

  beforeAll(() => {
    // Load globals.css and parse CSS custom properties
    const cssPath = path.join(process.cwd(), 'app/globals.css')
    const cssContent = fs.readFileSync(cssPath, 'utf-8')
    
    // Create a DOM to compute styles
    const dom = new JSDOM(`<!DOCTYPE html><html><head><style>${cssContent}</style></head><body></body></html>`)
    const doc = dom.window.document
    styles = dom.window.getComputedStyle(doc.documentElement)
  })

  it('defines journal paper color', () => {
    const color = styles.getPropertyValue('--journal-paper').trim()
    expect(color).toBe('#F5F1E8')
  })

  it('defines leather dark color', () => {
    const color = styles.getPropertyValue('--leather-dark').trim()
    expect(color).toBe('#3E2723')
  })

  it('defines ink black color', () => {
    const color = styles.getPropertyValue('--ink-black').trim()
    expect(color).toBe('#1A1412')
  })

  it('defines focus ring color', () => {
    const color = styles.getPropertyValue('--focus-ring').trim()
    expect(color).toBe('#8D6E63')
  })

  it('defines spacing scale', () => {
    expect(styles.getPropertyValue('--space-md').trim()).toBe('1rem')
    expect(styles.getPropertyValue('--space-xl').trim()).toBe('2rem')
  })
})
