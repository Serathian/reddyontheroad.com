# Testing Patterns

**Analysis Date:** 2026-03-14

## Test Framework

**Runner:**
- Not detected - No test framework currently configured

**Assertion Library:**
- Not detected

**Run Commands:**
- Not applicable - No tests present

**Status:** 
This project currently has **no automated testing infrastructure**. The codebase consists of static HTML/CSS/JavaScript prototypes without a test suite.

## Test File Organization

**Location:**
- No test files detected

**Naming:**
- No established pattern

**Structure:**
- Not applicable

## Test Structure

**Suite Organization:**
- Not applicable - no test suites present

**Patterns:**
- Not established

## Mocking

**Framework:** 
- Not applicable

**Patterns:**
- Not established

**What to Mock:**
- For future implementation, candidates would include:
  - Mapbox GL JS API calls
  - External font loading
  - Browser APIs (Intersection Observer, scroll events)
  - Window/document properties

**What NOT to Mock:**
- DOM manipulation (test against real DOM)
- CSS variable resolution
- Basic HTML rendering

## Fixtures and Factories

**Test Data:**
- Not applicable - no test data fixtures

**Location:**
- Not applicable

**Suggested Pattern for Future:**
```javascript
// Potential fixture structure for week data
const mockWeekData = {
  week: 1,
  title: "The Journey Begins",
  date: "June 1-7, 2022",
  route: "Helsinki → Turku → Naantali",
  locations: [
    { name: 'Helsinki', coords: [24.9384, 60.1695] },
    { name: 'Turku', coords: [22.2666, 60.4518] }
  ],
  photos: 127,
  distance: "165 km"
};
```

## Coverage

**Requirements:** 
- None enforced

**View Coverage:**
- Not applicable

**Current Coverage:** 
- 0% (no tests)

## Test Types

**Unit Tests:**
- Not present
- **Recommended scope:** 
  - Scroll progress calculation logic (`updateProgress()`)
  - Week card activation detection
  - Map info update logic
  - CSS variable parsing

**Integration Tests:**
- Not present
- **Recommended scope:**
  - Scroll event triggering progress updates
  - Week card highlighting on scroll
  - Map info synchronization
  - Responsive layout breakpoints

**E2E Tests:**
- Not present
- **Recommended scope:**
  - Complete user journey through timeline
  - Mobile responsive behavior
  - Accessibility keyboard navigation
  - Cross-browser rendering

## Common Patterns

**Async Testing:**
- Not applicable currently
- **Future needs:**
  - Mapbox API initialization
  - Font loading completion
  - Scroll event debouncing

**Error Testing:**
- Not applicable currently
- **Future needs:**
  - Missing DOM elements
  - Invalid week data attributes
  - Mapbox initialization failures

## Recommendations for Test Implementation

### Suggested Test Framework Stack

**For Static Prototype:**
```bash
# Lightweight option for vanilla JS
npm install --save-dev jest @testing-library/dom @testing-library/user-event
```

**Test Configuration:**
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.test.js'],
  collectCoverageFrom: ['**/*.js', '!node_modules/**'],
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 70,
      functions: 70,
      lines: 70
    }
  }
};
```

### Priority Test Cases

**High Priority:**
1. Scroll progress calculation accuracy
2. Week card active state toggling
3. Progress marker position calculation
4. Map info text updates
5. Mobile responsive breakpoints

**Medium Priority:**
1. CSS variable fallbacks
2. Reduced motion preferences
3. Focus state management
4. Skip-to-content functionality

**Low Priority:**
1. Animation timing
2. Hover state transitions
3. Visual regression testing

### Example Test Pattern

**Scroll Progress Test:**
```javascript
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

describe('updateProgress', () => {
  beforeEach(() => {
    // Set up DOM
    document.body.innerHTML = `
      <div class="timeline-container">
        <div class="week-card" data-week="1">
          <h2 class="week-title">Week 1</h2>
          <div class="week-route">Helsinki → Turku</div>
        </div>
      </div>
      <div id="progressMarker"></div>
      <div id="mapInfo">
        <div class="map-info-title"></div>
        <div class="map-info-detail"></div>
      </div>
    `;
  });

  test('updates progress marker on scroll', () => {
    // Mock scroll position
    Object.defineProperty(window, 'pageYOffset', {
      value: 100,
      writable: true
    });

    updateProgress();

    const marker = document.getElementById('progressMarker');
    expect(marker.style.top).toBeDefined();
  });

  test('activates week card when in view', () => {
    const weekCard = document.querySelector('.week-card');
    
    // Mock getBoundingClientRect
    weekCard.getBoundingClientRect = () => ({
      top: 100,
      bottom: 500
    });

    updateProgress();

    expect(weekCard.classList.contains('active')).toBe(true);
  });
});
```

### Visual Regression Testing

**Tool Recommendation:**
```bash
# For screenshot comparison
npm install --save-dev playwright @playwright/test
```

**Test Pattern:**
```javascript
import { test, expect } from '@playwright/test';

test('journal prototype visual regression', async ({ page }) => {
  await page.goto('journal-prototype.html');
  
  // Desktop viewport
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page).toHaveScreenshot('desktop-full.png');
  
  // Mobile viewport
  await page.setViewportSize({ width: 375, height: 667 });
  await expect(page).toHaveScreenshot('mobile-full.png');
  
  // Week card detail
  const weekCard = page.locator('.week-card').first();
  await expect(weekCard).toHaveScreenshot('week-card.png');
});
```

## Testing Checklist for Future Implementation

- [ ] Install test framework (Jest or Vitest recommended)
- [ ] Create `__tests__/` directory
- [ ] Add test for scroll progress calculation
- [ ] Add test for week card activation
- [ ] Add test for map info updates
- [ ] Add accessibility tests (axe-core)
- [ ] Add visual regression tests (Playwright)
- [ ] Configure CI pipeline for automated testing
- [ ] Set coverage threshold (70%+ recommended)
- [ ] Document testing patterns in this file

## Manual Testing Checklist

**Current Testing Approach:**
Since no automated tests exist, manual testing is critical:

**Desktop Testing:**
- [ ] Scroll through timeline, verify progress marker moves
- [ ] Verify week cards highlight when scrolled into view
- [ ] Check map info updates with correct week data
- [ ] Test navigation links
- [ ] Verify all CSS variables render correctly
- [ ] Test hover states on interactive elements

**Mobile Testing:**
- [ ] Verify responsive layout at 375px, 768px, 1024px
- [ ] Test touch scrolling performance
- [ ] Check text readability on small screens
- [ ] Verify navigation menu (when implemented)

**Accessibility Testing:**
- [ ] Keyboard navigation (Tab, Enter, Space)
- [ ] Screen reader compatibility (NVDA, VoiceOver)
- [ ] Color contrast ratios (WCAG AA: 4.5:1 for text)
- [ ] Reduced motion preference respected
- [ ] Focus indicators visible

**Browser Compatibility:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

**Performance Testing:**
- [ ] Scroll smoothness (60fps target)
- [ ] Font loading performance
- [ ] Image lazy loading (when implemented)
- [ ] Lighthouse audit score

---

*Testing analysis: 2026-03-14*
