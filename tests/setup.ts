import '@testing-library/jest-dom';
import { MockIntersectionObserver } from './mocks/IntersectionObserver'

// Register IntersectionObserver mock globally for JSDOM compatibility
// JSDOM doesn't implement IntersectionObserver, which causes "IntersectionObserver is not defined" errors
global.IntersectionObserver = MockIntersectionObserver as any

