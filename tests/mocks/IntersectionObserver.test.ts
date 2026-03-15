import { describe, it, expect, vi } from 'vitest'
import { MockIntersectionObserver } from '@/tests/mocks/IntersectionObserver'

describe('IntersectionObserver mock', () => {
  it('is available globally in test environment', () => {
    expect(global.IntersectionObserver).toBeDefined()
    expect(typeof global.IntersectionObserver).toBe('function')
  })

  it('can be instantiated with callback', () => {
    const callback = vi.fn()
    const observer = new MockIntersectionObserver(callback)
    
    expect(observer).toBeInstanceOf(MockIntersectionObserver)
    expect(observer.callback).toBe(callback)
  })

  it('tracks observed elements', () => {
    const callback = vi.fn()
    const observer = new MockIntersectionObserver(callback)
    const element = document.createElement('div')
    
    observer.observe(element)
    
    expect(observer.observe).toHaveBeenCalledWith(element)
    expect(observer.elements).toContain(element)
  })

  it('removes elements on unobserve', () => {
    const callback = vi.fn()
    const observer = new MockIntersectionObserver(callback)
    const element = document.createElement('div')
    
    observer.observe(element)
    observer.unobserve(element)
    
    expect(observer.unobserve).toHaveBeenCalledWith(element)
    expect(observer.elements).not.toContain(element)
  })

  it('clears all elements on disconnect', () => {
    const callback = vi.fn()
    const observer = new MockIntersectionObserver(callback)
    const element1 = document.createElement('div')
    const element2 = document.createElement('div')
    
    observer.observe(element1)
    observer.observe(element2)
    observer.disconnect()
    
    expect(observer.disconnect).toHaveBeenCalled()
    expect(observer.elements).toHaveLength(0)
  })

  it('accepts configuration options', () => {
    const callback = vi.fn()
    const observer = new MockIntersectionObserver(callback, {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0.5
    })
    
    expect(observer.root).toBe(null)
    expect(observer.rootMargin).toBe('-50% 0px -50% 0px')
    expect(observer.thresholds).toEqual([0.5])
  })

  it('can simulate intersection events', () => {
    const callback = vi.fn()
    const observer = new MockIntersectionObserver(callback)
    const element = document.createElement('div')
    element.setAttribute('data-id', 'test-element')
    
    observer.observe(element)
    observer.triggerIntersection(element, true)
    
    expect(callback).toHaveBeenCalled()
    const [entries] = callback.mock.calls[0]
    expect(entries).toHaveLength(1)
    expect(entries[0].target).toBe(element)
    expect(entries[0].isIntersecting).toBe(true)
    expect(entries[0].intersectionRatio).toBe(1)
  })

  it('can simulate intersection exit', () => {
    const callback = vi.fn()
    const observer = new MockIntersectionObserver(callback)
    const element = document.createElement('div')
    
    observer.observe(element)
    observer.triggerIntersection(element, false)
    
    expect(callback).toHaveBeenCalled()
    const [entries] = callback.mock.calls[0]
    expect(entries[0].isIntersecting).toBe(false)
    expect(entries[0].intersectionRatio).toBe(0)
  })
})
