# Plan: UI Color System Overhaul (Dark → Light Theme)

This is a **full theme flip** from the current dark warm theme to a light theme using four colors. The current system has 15+ CSS tokens (amber/rose/lime accents, near-black backgrounds, cream text) plus ~10 hardcoded color values scattered across components.

---

## Phase 1 — CSS Design Tokens (globals.css)

**Step 1: Redefine background tokens**
- `--bg-base`: `#E9E3DF` (was `#0D0B09`)
- `--bg-surface`: `#DED8D3` — slightly darker surface
- `--bg-card`: `#F5F1ED` — lighter than base for card lift
- `--bg-elevated`: `#FFFFFF` — bright elevated surfaces
- `--bg-border`: `#C9C1BA` — muted beige-gray dividers

**Step 2: Redefine accent tokens**
- `--accent-primary`: `#FF7A30` (was `#F59E0B`)
- `--accent-primary-dim`: `#D9601A`
- `--accent-primary-glow`: `rgba(255, 122, 48, 0.15)`
- Rename `--accent-rose` → `--accent-secondary`: `#465C88` (slate blue)
- `--accent-secondary-dim`: `#344669`
- `--accent-secondary-glow`: `rgba(70, 92, 136, 0.12)`
- **Remove** `--accent-lime` family (no longer in palette)

**Step 3: Redefine text tokens**
- `--text-primary`: `#000000` (was `#FDF4E7`)
- `--text-secondary`: `#465C88` or `rgba(0,0,0,0.6)` — muted
- `--text-tertiary`: `rgba(0, 0, 0, 0.35)`

**Step 4: Redefine gradients** — update all three to use `#FF7A30` and `#465C88`

**Step 5: Update utility classes** — `.section-label` border/glow, scrollbar colors

---

## Phase 2 — Component Hardcoded Colors *(depends on Phase 1)*

| Step | File | What to fix |
|------|------|-------------|
| 6 | `components/landing/Navbar.tsx` | 4 hardcoded rgba values (translucent bg, border glow, shadow) |
| 7 | `components/landing/FeatureCard.tsx` | 1 hardcoded rose rgba border → slate blue |
| 8 | `components/landing/ContactSection.tsx` | 2 hardcoded amber rgba values → orange |
| 9 | `components/landing/DashboardShowcase.tsx` | 1 hardcoded lime rgba + remap `--accent-rose`/`--accent-lime` refs |
| 10 | `components/landing/WorkflowVisual.tsx` | 1 hardcoded shadow rgba (soften for light bg) |
| 11 | `components/ScrollCard.tsx` | 1 hardcoded `#b8c5b2` + define missing `--charcoal`/`--cream` vars |
| 12 | `components/HorizontalSection.tsx` | Uses undefined `--cream` var (fixed by step 11) |

Components using only CSS vars (`HeroSection.tsx`, `FeaturesSection.tsx`, `Footer.tsx`) auto-update with Phase 1.

---

## Phase 3 — Polish & Verification *(depends on Phase 2)*

**Step 13:** Review WCAG contrast ratios (key ones all pass AA)

**Step 14:** Update `prompt.md` design system documentation

---

## Verification

1. `npm run dev` → visually confirm light background across all sections
2. Grep workspace for leftover old colors: `F59E0B`, `F43F5E`, `84CC16`, `0D0B09`
3. Inspect hover/focus states on buttons, inputs, nav links
4. Verify gradient-text utility renders with new orange→blue gradient
5. Check scrollbar styling against light background

---

## Decisions Made

- **Dark → Light flip**: backgrounds become light, text becomes dark
- **Orange replaces amber** as primary; **Slate blue replaces rose** as secondary
- **Lime accent removed** entirely — remapped to primary/secondary
- **`--cream` / `--charcoal`** undefined vars will be added as `#E9E3DF` / `#000000`

## Open Questions

1. **CTA button text**: Black on `#FF7A30` passes WCAG AA (5.4:1), white does not (2.9:1). **Recommend black text on orange buttons** — confirm?
2. **Intermediate bg shades**: Proposed `#DED8D3` / `#F5F1ED` / `#FFFFFF` progression from base `#E9E3DF`. Finalize now or iterate visually?
3. **Secondary text color**: Use `#465C88` (slate blue — adds personality) or neutral `rgba(0,0,0,0.6)`? **Recommend slate blue** — confirm?
