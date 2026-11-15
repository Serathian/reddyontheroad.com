import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('Design System CSS Variables', () => {
  let styles: CSSStyleDeclaration
  let styleElement: HTMLStyleElement

  beforeAll(() => {
    const cssPath = path.join(process.cwd(), 'app/globals.css')
    const cssContent = fs.readFileSync(cssPath, 'utf-8')

    styleElement = document.createElement('style')
    styleElement.textContent = cssContent
    document.head.appendChild(styleElement)

    styles = window.getComputedStyle(document.documentElement)
  })

  afterAll(() => {
    styleElement.remove()
  })

  it('defines cream and warm white surface colors', () => {
    expect(styles.getPropertyValue('--cream').trim()).toBe('#FBF9F4')
    expect(styles.getPropertyValue('--warm-white').trim()).toBe('#FFFDF8')
  })

  it('defines burnt orange and olive green earth tone accents', () => {
    expect(styles.getPropertyValue('--burnt-orange').trim()).toBe('#C65D3B')
    expect(styles.getPropertyValue('--olive-green').trim()).toBe('#4A5D3F')
  })

  it('defines neutral gray-900 ink color', () => {
    expect(styles.getPropertyValue('--gray-900').trim()).toBe('#1C1917')
  })

  it('defines focus ring color token', () => {
    expect(styles.getPropertyValue('--focus-ring').trim()).toBe('var(--burnt-orange)')
  })

  it('defines spacing scale', () => {
    expect(styles.getPropertyValue('--space-md').trim()).toBe('1rem')
    expect(styles.getPropertyValue('--space-xl').trim()).toBe('2rem')
  })
})
