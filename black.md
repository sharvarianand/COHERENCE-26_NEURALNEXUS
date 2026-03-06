# Plan: Dark Design System Overhaul (#000000 / #3E3636 / #D72323 / #F5EDED)

Light → Dark theme flip with a 4-color palette: black base, dark brown surfaces, red accent, light pink text. Requires updating 18 CSS tokens, 3 gradients, ~12 hardcoded RGBA values across 10 component files, plus utility classes and scrollbar styles.

## New Palette Mapping

| Color | Hex | Role |
|-------|-----|------|
| Black | #000000 | Base background, primary dark |
| Dark Brown | #3E3636 | Surface/card backgrounds, secondary dark |
| Red | #D72323 | Primary accent (CTAs, highlights, links) |
| Light Pink | #F5EDED | Primary text, light surfaces, borders |

## Phase 1 — CSS Design Tokens (globals.css)

**Step 1: Redefine background tokens**
- `--bg-base`: `#000000` (was `#E9E3DF`) — main page background
- `--bg-surface`: `#3E3636` (was `#DED8D3`) — section surfaces
- `--bg-card`: `#3E3636` (was `#F5F1ED`) — card backgrounds
- `--bg-elevated`: `#4A4040` (was `#FFFFFF`) — elevated surfaces (slightly lighter than #3E3636)
- `--bg-border`: `rgba(245, 237, 237, 0.15)` (was `#C9C1BA`) — subtle light borders on dark

**Step 2: Redefine accent tokens**
- `--accent-primary`: `#D72323` (was `#FF7A30`) — red replaces orange
- `--accent-primary-dim`: `#A91B1B` (was `#D9601A`) — darker red
- `--accent-primary-glow`: `rgba(215, 35, 35, 0.15)` (was `rgba(255, 122, 48, 0.15)`)
- `--accent-secondary`: `#F5EDED` (was `#465C88`) — light pink as secondary
- `--accent-secondary-dim`: `#D4C5C5` (was `#344669`) — muted pink
- `--accent-secondary-glow`: `rgba(245, 237, 237, 0.10)` (was `rgba(70, 92, 136, 0.12)`)

**Step 3: Redefine text tokens**
- `--text-primary`: `#F5EDED` (was `#000000`) — light text on dark
- `--text-secondary`: `rgba(245, 237, 237, 0.65)` (was `#465C88`) — muted light text
- `--text-tertiary`: `rgba(245, 237, 237, 0.35)` (was `rgba(0, 0, 0, 0.35)`)

**Step 4: Update compatibility tokens**
- `--cream`: `#F5EDED` (was `#E9E3DF`)
- `--charcoal`: `#000000` (unchanged)

**Step 5: Redefine gradients**
- `--gradient-hero`: `radial-gradient(ellipse 80% 60% at 50% -10%, rgba(215, 35, 35, 0.20) 0%, rgba(62, 54, 54, 0.30) 45%, transparent 70%)`
- `--gradient-card`: `linear-gradient(135deg, rgba(215, 35, 35, 0.09) 0%, rgba(245, 237, 237, 0.05) 100%)`
- `--gradient-text`: `linear-gradient(135deg, #D72323 0%, #F5EDED 100%)`

**Step 6: Update utility classes**
- `.section-label` border: `rgba(215, 35, 35, 0.28)` (was orange rgba)
- Scrollbar thumb hover: stays `var(--accent-secondary)` (now resolves to light pink)

## Phase 2 — Component Hardcoded Colors *(depends on Phase 1)*

| Step | File | What to fix |
|------|------|-------------|
| 7 | `components/landing/Navbar.tsx` | `rgba(245, 241, 237, 0.82)` bg → `rgba(0, 0, 0, 0.85)` dark translucent; `rgba(255, 122, 48, 0.22)` border → `rgba(215, 35, 35, 0.22)`; `rgba(52, 70, 105, 0.36)` shadow → `rgba(0, 0, 0, 0.50)`; `rgba(255, 255, 255, 0.75)` top edge → `rgba(245, 237, 237, 0.10)` |
| 8 | `components/landing/ContactSection.tsx` | `rgba(255, 122, 48, 0.12)` radial glow → `rgba(215, 35, 35, 0.12)`; `rgba(255, 122, 48, 0.25)` focus glow → `rgba(215, 35, 35, 0.25)` |
| 9 | `components/landing/FeatureCard.tsx` | `rgba(70, 92, 136, 0.22)` ghost border → `rgba(245, 237, 237, 0.15)` |
| 10 | `components/landing/WorkflowVisual.tsx` | `rgba(52, 70, 105, 0.26)` shadow → `rgba(0, 0, 0, 0.40)` |
| 11 | `components/ScrollCard.tsx` | Default color prop `#DED8D3` → `#3E3636`; `rgba(0, 0, 0, 0.25)` button border → `rgba(245, 237, 237, 0.25)`; `rgba(0, 0, 0, 0.12)` shadow → `rgba(0, 0, 0, 0.30)` (stronger on dark) |
| 12 | `components/landing/DashboardShowcase.tsx` | `rgba(52, 70, 105, 0.26)` shadow if present → dark equivalent |

Components using only CSS vars auto-update: `HeroSection.tsx`, `FeaturesSection.tsx`, `Footer.tsx`.

## Phase 3 — Button Text & Contrast Adjustments *(depends on Phase 1)*

| Element | Current | New | WCAG |
|---------|---------|-----|------|
| CTA buttons | Black text on orange | `#F5EDED` text on `#D72323` bg | 4.8:1 (AA pass) |
| Hover states | Orange bg | `#A91B1B` bg (darker red) | Passes |
| Nav link hover | Orange text on light | Red text on dark | High contrast |
| Body text | `#000000` on `#E9E3DF` | `#F5EDED` on `#000000` | 18.1:1 (AAA pass) |
| Secondary text | Slate blue on light | `rgba(245,237,237,0.65)` on `#000000` | ~11:1 (AAA pass) |

**Decision**: Button text on `#D72323` should be `#F5EDED` (light) — 4.8:1 passes AA. Black text on red only gives 3.2:1 (fails).

## Phase 4 — Polish & Verification *(depends on Phases 2–3)*

**Step 13:** Grep workspace for leftover colors: `FF7A30`, `D9601A`, `465C88`, `344669`, `E9E3DF`, `DED8D3`, `F5F1ED`, `C9C1BA`
**Step 14:** Update `design.md` to document the new dark design system
**Step 15:** Update `prompt.md` if it references the old color system

## Relevant Files

- `app/globals.css` — all 18 CSS tokens, 3 gradients, utility classes, scrollbar
- `components/landing/Navbar.tsx` — 4 hardcoded RGBA values (bg, border, shadow, top edge)
- `components/landing/ContactSection.tsx` — 2 hardcoded orange RGBA values
- `components/landing/FeatureCard.tsx` — 1 hardcoded slate-blue RGBA border
- `components/landing/WorkflowVisual.tsx` — 1 hardcoded shadow RGBA
- `components/landing/DashboardShowcase.tsx` — check for hardcoded shadows
- `components/ScrollCard.tsx` — 3 hardcoded values (default color, border, shadow)
- `components/landing/HeroSection.tsx` — CSS vars only (auto-updates)
- `components/landing/FeaturesSection.tsx` — CSS vars only (auto-updates)
- `components/landing/Footer.tsx` — CSS vars only (auto-updates)
- `components/HorizontalSection.tsx` — uses `--cream` (auto-updates)
- `design.md` — update to reflect new system
- `prompt.md` — update if references old colors

## Verification

1. `npm run dev` → confirm dark background (#000000) across all sections
2. Grep for all old hex/rgba values listed above — zero matches expected
3. Inspect CTA buttons: light text on red background
4. Verify `.gradient-text` renders red→light pink gradient
5. Check navbar glass effect against dark background
6. Verify card borders visible (subtle light on dark)
7. Test hover/focus states on buttons, inputs, nav links
8. Confirm scrollbar styling against dark background

## Decisions

- **Light → Dark flip**: backgrounds become dark (#000000, #3E3636), text becomes light (#F5EDED)
- **Red replaces orange** as primary accent; **Light pink replaces slate blue** as secondary
- **CTA button text**: `#F5EDED` on `#D72323` (4.8:1 — AA pass). Black on red fails.
- **`--bg-elevated`**: `#4A4040` (computed — slightly lighter than `#3E3636` for depth)
- **`--bg-border`**: semi-transparent light (`rgba(245,237,237,0.15)`) for subtle dividers on dark
