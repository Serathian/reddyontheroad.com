// tests/mocks/IntersectionObserver.ts
import { vi } from 'vitest'

/**
 * Mock implementation of IntersectionObserver for Vitest/JSDOM compatibility
 * 
 * JSDOM doesn't implement IntersectionObserver API, which causes tests to fail
 * with "IntersectionObserver is not defined" errors. This mock provides a
 * working implementation for testing carousel scroll detection.
 * 
 * Based on Pattern 2 from 02-RESEARCH.md and Pitfall 6 guidance.
 */
export class MockIntersectionObserver implements IntersectionObserver {
  callback: IntersectionObserverCallback
  elements: Element[] = []
  root: Element | Document | null = null
  rootMargin: string = ''
  thresholds: ReadonlyArray<number> = []

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {
    this.callback = callback
    this.root = options?.root ?? null
    this.rootMargin = options?.rootMargin ?? ''
    this.thresholds = Array.isArray(options?.threshold)
      ? options.threshold
      : [options?.threshold ?? 0]
  }

  observe = vi.fn((element: Element) => {
    this.elements.push(element)
  })

  unobserve = vi.fn((element: Element) => {
    this.elements = this.elements.filter((el) => el !== element)
  })

  disconnect = vi.fn(() => {
    this.elements = []
  })

  takeRecords = vi.fn((): IntersectionObserverEntry[] => {
    return []
  })

  /**
   * Test helper: Simulate intersection event
   * 
   * Usage in tests:
   * ```ts
   * const observer = new MockIntersectionObserver(callback)
   * observer.observe(element)
   * observer.triggerIntersection(element, true) // Simulate element entering viewport
   * ```
   */
  triggerIntersection(element: Element, isIntersecting: boolean) {
    const entry: IntersectionObserverEntry = {
      target: element,
      isIntersecting,
      intersectionRatio: isIntersecting ? 1 : 0,
      boundingClientRect: element.getBoundingClientRect(),
      intersectionRect: isIntersecting ? element.getBoundingClientRect() : ({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        toJSON: () => ({})
      } as DOMRectReadOnly),
      rootBounds: null,
      time: Date.now()
    }

    this.callback([entry], this)
  }
}
