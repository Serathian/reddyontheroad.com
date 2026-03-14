# Codebase Structure

**Analysis Date:** 2026-03-14

## Directory Layout

```
reddyontheroad.com/
├── .git                           # Git repository
├── .gitignore                     # Git ignore rules
├── .planning/                     # GSD planning artifacts
│   └── codebase/                  # Codebase analysis documents
├── .opencode/                     # Editor configuration and skills
│   ├── skills/                    # UI/UX design skills
│   └── package.json               # OpenCode dependencies
├── archive/                       # Outdated design iterations
│   ├── README.md                  # Archive explanation
│   ├── DESIGN_SYSTEM.md           # Old coffee palette design
│   ├── MODERN_DESIGN_SYSTEM.md    # Transition design
│   ├── modern-prototype.html      # Old prototype
│   └── [other archived files]
├── design-system/                 # UI/UX research artifacts
│   └── reddy-on-the-road/
│       ├── MASTER.md              # Design research notes
│       └── pages/                 # Design page examples
├── AGENT_HANDOFF.md               # Agent context and handoff notes
├── PROJECT_README.md              # Main project documentation
├── FILE_INDEX.md                  # File navigation guide
├── JOURNAL_DESIGN_SYSTEM.md       # Current design specifications
├── MAP_ANIMATION_IMPLEMENTATION.md # Map integration guide
├── journal-prototype.html         # Working prototype (primary)
├── journal-palette-preview.html   # Color/texture reference
├── design-system-styles.css       # CSS variables and styles
└── tailwind.config.example.js     # Tailwind config (optional)
```

## Directory Purposes

**Root Directory:**
- Purpose: Active project files and working prototypes
- Contains: Documentation (`.md`), prototypes (`.html`), styles (`.css`), config (`.js`)
- Key files: `PROJECT_README.md` (project overview), `journal-prototype.html` (working demo)

**`.planning/codebase/`:**
- Purpose: GSD codebase analysis documents
- Contains: Architecture, structure, conventions, testing analysis
- Key files: `ARCHITECTURE.md`, `STRUCTURE.md`

**`.opencode/`:**
- Purpose: Editor configuration and AI skills
- Contains: UI/UX skills with design system databases
- Key files: `skills/ui-ux-pro-max/SKILL.md`

**`archive/`:**
- Purpose: Historical design iterations
- Contains: Superseded prototypes, old documentation, previous design systems
- Key files: `README.md` (explains what's archived and why)

**`design-system/reddy-on-the-road/`:**
- Purpose: UI/UX research and design explorations
- Contains: Design research notes, page examples
- Key files: `MASTER.md`

## Key File Locations

**Entry Points:**
- `journal-prototype.html`: Primary working prototype with full journal aesthetic
- `journal-palette-preview.html`: Visual reference for colors and textures

**Configuration:**
- `design-system-styles.css`: CSS custom properties for journal design system
- `tailwind.config.example.js`: Optional Tailwind CSS configuration

**Core Documentation:**
- `PROJECT_README.md`: Project overview, design decisions, next steps
- `JOURNAL_DESIGN_SYSTEM.md`: Complete design specifications (colors, typography, components)
- `MAP_ANIMATION_IMPLEMENTATION.md`: Mapbox integration with scroll animation code
- `FILE_INDEX.md`: File navigation guide

**Meta Documentation:**
- `AGENT_HANDOFF.md`: Agent context and handoff notes
- `archive/README.md`: Explanation of archived files

## Naming Conventions

**Files:**
- Documentation: `SCREAMING_SNAKE_CASE.md` for primary docs (`PROJECT_README.md`, `JOURNAL_DESIGN_SYSTEM.md`)
- Prototypes: `kebab-case.html` (`journal-prototype.html`, `journal-palette-preview.html`)
- Styles: `kebab-case.css` (`design-system-styles.css`)
- Configuration: `kebab-case.example.js` for templates (`tailwind.config.example.js`)

**Directories:**
- Lowercase with hyphens: `design-system/`, `archive/`
- Hidden config: `.planning/`, `.opencode/`

**CSS Classes:**
- BEM-lite pattern: `block-element` or `block-modifier`
- Examples: `.week-card`, `.week-title`, `.photo-frame`, `.photo-caption`
- Utility classes: Single purpose, hyphenated (`.text-center`, `.cursor-pointer`)

**CSS Variables:**
- Two-part naming: `--category-variant`
- Examples: `--journal-paper`, `--leather-dark`, `--ink-black`, `--sepia-medium`
- Semantic over descriptive: `--ink-black` not `--color-1a1412`

**HTML Data Attributes:**
- Kebab-case: `data-week="1"`
- Used for: JavaScript interaction targets, state management

## Where to Add New Code

**New Prototype/Demo:**
- Primary code: Root directory (e.g., `new-feature-prototype.html`)
- Tests: None (static prototypes)
- Document in: `FILE_INDEX.md` with description and purpose

**New Design Component:**
- Implementation: Add to `journal-prototype.html` as example
- Styles: Add to `design-system-styles.css` or inline in prototype
- Documentation: Add section to `JOURNAL_DESIGN_SYSTEM.md`

**Design System Updates:**
- Color changes: Update CSS variables in `design-system-styles.css` and `JOURNAL_DESIGN_SYSTEM.md`
- Typography changes: Update Google Fonts import and font variables
- Component patterns: Add to `JOURNAL_DESIGN_SYSTEM.md` with code examples

**Configuration Files:**
- Framework configs: Root directory with `.example.js` suffix
- Build tools: Not yet applicable (no build process)

**Documentation:**
- Project-level docs: Root directory (`SCREAMING_SNAKE_CASE.md`)
- Feature-specific docs: Inline in relevant prototype or separate `.md` file
- Agent notes: `AGENT_HANDOFF.md`

**Outdated/Superseded Files:**
- Move to: `archive/` directory
- Document in: `archive/README.md` with explanation

## Special Directories

**`archive/`:**
- Purpose: Historical design iterations (coffee palette, formal typography, early prototypes)
- Generated: No (manually curated)
- Committed: Yes (preserved for reference)

**`.planning/codebase/`:**
- Purpose: GSD codebase analysis documents
- Generated: Yes (by GSD commands)
- Committed: Yes (planning artifacts)

**`.opencode/`:**
- Purpose: Editor configuration and AI skills
- Generated: Partially (skills may be installed, config is manual)
- Committed: Yes (configuration and skills)

**`.git/`:**
- Purpose: Git version control
- Generated: Yes (by Git)
- Committed: No (Git internals)

**`design-system/reddy-on-the-road/pages/`:**
- Purpose: Design page examples and explorations
- Generated: No (manually created design artifacts)
- Committed: Yes (design research)

## Project Phase Guidance

**Current Phase:** Static Prototype / Design Validation

**File Organization for Next Phase (Implementation):**

When moving to production implementation:
- Create `src/` directory for source files
- Create `public/` directory for static assets
- Create `components/` for reusable UI components
- Keep prototypes in root for reference
- Copy CSS variables from `design-system-styles.css` to framework setup

**Content Integration:**
- Travel data: Add as JSON file in `src/data/weeks.json`
- Photos: Store in `public/images/weeks/`
- Route coordinates: Add to `src/data/route.json`

**Testing Setup:**
- Test files: Co-locate with components (`component.test.js`)
- E2E tests: `tests/e2e/`
- Visual regression: `tests/visual/`

## Navigation Patterns

**Starting Point:**
1. Read `PROJECT_README.md` for project overview
2. Open `journal-prototype.html` in browser to see design
3. Reference `JOURNAL_DESIGN_SYSTEM.md` for implementation details
4. Reference `MAP_ANIMATION_IMPLEMENTATION.md` for map integration

**Finding Design Specs:**
- Colors: `JOURNAL_DESIGN_SYSTEM.md` → Color Palette section
- Typography: `JOURNAL_DESIGN_SYSTEM.md` → Typography section
- Components: `JOURNAL_DESIGN_SYSTEM.md` → Search for component name
- CSS Variables: `design-system-styles.css` → `:root` section

**Understanding Decisions:**
- Design rationale: `PROJECT_README.md` → Design Decisions Log
- What's archived: `archive/README.md`
- File purposes: `FILE_INDEX.md`

**Implementation Guidance:**
- Map setup: `MAP_ANIMATION_IMPLEMENTATION.md`
- Tailwind setup: Copy `tailwind.config.example.js` → `tailwind.config.js`
- CSS setup: Copy variables from `design-system-styles.css`

---

*Structure analysis: 2026-03-14*
