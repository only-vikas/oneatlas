---
name: Carbon Ledger
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1c1b1d'
  surface-container: '#201f22'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#d8c3ad'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#313032'
  outline: '#a08e7a'
  outline-variant: '#534434'
  surface-tint: '#ffb95f'
  primary: '#ffc174'
  on-primary: '#472a00'
  primary-container: '#f59e0b'
  on-primary-container: '#613b00'
  inverse-primary: '#855300'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#8ed5ff'
  on-tertiary: '#00354a'
  tertiary-container: '#38bdf8'
  on-tertiary-container: '#004965'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffddb8'
  primary-fixed-dim: '#ffb95f'
  on-primary-fixed: '#2a1700'
  on-primary-fixed-variant: '#653e00'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#c4e7ff'
  tertiary-fixed-dim: '#7bd0ff'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004c69'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
  surface-canvas: '#09090B'
  surface-well: '#101013'
  surface-raised: '#16161A'
  surface-overlay: '#1C1C21'
  hairline: rgba(255, 255, 255, 0.07)
  hairline-strong: rgba(255, 255, 255, 0.14)
  text-primary: '#F4F4F5'
  text-secondary: '#A1A1AA'
  text-tertiary: '#6B6B74'
  signal-amber: '#F59E0B'
  signal-mint: '#10B981'
  signal-sky: '#38BDF8'
  signal-coral: '#F43F5E'
typography:
  display-lg:
    fontFamily: Newsreader
    fontSize: 56px
    fontWeight: '400'
    lineHeight: 64px
    letterSpacing: -0.01em
  display-lg-mobile:
    fontFamily: Newsreader
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: -0.01em
  display-md:
    fontFamily: Newsreader
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.03em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 30px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 21px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 19px
    letterSpacing: -0.01em
  body-dense:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 13px
    letterSpacing: 0em
  numeric-lg:
    fontFamily: JetBrains Mono
    fontSize: 15px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0em
  numeric-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  numeric-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-micro:
    fontFamily: Geist
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 12px
    letterSpacing: 0.09em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-dense: 0.5rem
  margin: 1.5rem
  margin-dock: 5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

# OneAtlas — Design System Manifest
### `DESIGN.v3.md` — Frontend Track (AI Model Discovery & Intelligence Platform)

> **Agenda.** Remove three defaults from AI-generated frontends: Inter-everywhere typography, static symmetric grid boxes, and purple-to-cyan gradient theming. Every token below has a job: align a number, carry hierarchy, signal state, or cue motion. Nothing is decorative.
>
> **v3 changes:** added §7 Routes & Shell, §8 Data Contract, a single persistent `<AmbientCanvas>` (§5.7, replaces per-screen canvases), new components (§4: command palette, presets, API snippet drawer, Pareto nodes, sort control), and a Pareto frontier rule (§4.6).

---

## 0. Design Thesis

OneAtlas is a terminal, not a dashboard. The visual argument is: *model intelligence is financial data, so it should look like a trading terminal, not like marketing cards.*

1. **Ledger, not cards.** Information lives in dense rows and hairline-divided panels. No floating drop-shadowed boxes.
2. **Earned color.** A colored pixel reports something: rank, savings, capability, or risk. Nothing is colored for mood.
3. **Motion is instrumentation.** Every animation makes a state change legible: a number updating, a rank shifting, a selection forming.

---

## 1. Typography — Four-Tier Instrument Stack

| Tier | Typeface | Use | Size / tracking | Rules |
|---|---|---|---|---|
| **Display** | `Instrument Serif` | Hero titles, section dividers, empty-state headlines | 40–64px / `-0.01em` | Never bold. One word per headline may be italic for accent: "Route to the *fastest* intelligence." |
| **Structural** | `Space Grotesk` | H2/H3, nav labels, modal titles, model names in tables | 18–28px / `-0.03em` | Carries the high-craft product signal. |
| **UI / Body** | `Geist Sans` | Filter labels, descriptions, column headers, body | 13–14px / `-0.01em` | Descriptions line-height 1.45; table cells 1.0. |
| **Numeric / Data** | `Geist Mono`, `font-variant-numeric: tabular-nums` | Prices, context length, latency, benchmark scores, timestamps, slugs, code | 12–15px | Every number in the product uses this tier. Verify decimal alignment visually in stacked rows. |
| **Micro-label** | `Geist Sans` 500, uppercase, `+0.09em` | Status chips, rank badges, rail headers, keyboard hints | 10–11px | Always inside a chip, rule, or rail header. Never in a sentence. |

**Hard rules**
- No typeface outside this stack. No `Inter`, `Poppins`, `Roboto`, or system-ui fallbacks visible in the design.

---

## 2. Color — Carbon Ledger System

### 2.1 Surface Tokens

```
--surface-canvas:    #09090B   /* base */
--surface-well:      #101013   /* recessed: table bodies, chart panels, rail */
--surface-raised:    #16161A   /* hover rows, popovers */
--surface-overlay:   #1C1C21   /* command palette, compare dock, tooltips */
--hairline:          rgba(255,255,255,0.07)
--hairline-strong:   rgba(255,255,255,0.14)
--text-primary:      #F4F4F5
--text-secondary:    #A1A1AA
--text-tertiary:     #6B6B74
--grain-opacity:     0.025
```

No `box-shadow` in the system except the Compare Dock, the command palette (blur only), and tooltips (1px hairline, no shadow). Hierarchy comes from hairlines and luminance steps.

### 2.2 Signal Palette

| Token | Hex | Meaning | Allowed on |
|---|---|---|---|
| `--signal-amber` | `#F59E0B` | Primary action, #1 rank, active route, frontier models | Primary buttons, active tab underline, rank-1 badge, focus ring, Pareto frontier |
| `--signal-mint` | `#10B981` | Best value, savings, lowest cost | Lowest-cost cell, "Best Value" chip, positive deltas |
| `--signal-sky` | `#38BDF8` | Capability, data visualization | Benchmark bars, context meters, modality dots, "NEW" chips |
| `--signal-coral` | `#F43F5E` | Cost premium, latency spike, risk | High-latency flags, expensive tiers, negative deltas |

**Rule of One:** a single row or component carries at most two signal colors.
**Gradient exception:** one 2%-opacity radial amber wash behind the #1 ranked row, once per leaderboard. No other gradients.

### 2.3 Chromatic Budget

Signal-colored pixels ≤ 6% of the visible viewport.

### 2.4 Texture

- **Header dot-matrix:** 24px-pitch radial dot grid at `rgba(255,255,255,0.025)`, masked to a 120px band behind the global header or hero band. Inline SVG `<pattern>`, not an image.
- **Canvas grain:** 2.5%-opacity `feTurbulence` noise, `overlay` blend, fixed to viewport. Static only.
- **Focus bloom:** focused inputs and active rows get a 1px `--signal-amber` inset ring and a 6px, 8%-opacity amber blur *behind* the element.

---

## 3. Grid — The Ledger Breaks the Box

- **Rail (240px, fixed):** filters or section nav, flush left, full-height hairline on its right edge.
- **Spine (1px):** the hairline is a layout element, full-height between rail and content.
- **Content (fluid, min 720px):** left-aligned to the spine, not centered. Right margin of 80–120px holds floating annotations.
- **Telemetry strip (56px, bottom-anchored, optional):** on `/compare`, `/rankings`, and `/models/[slug]`.
- **Root landing (`/`) uses a three-column hairline ledger strip** under the hero instead of cards.

**Banned:** centered max-width containers with equal gutters, cards with 16px+ radius and drop shadow, sections with equal visual weight.

---

## 4. Components

### 4.1 Table Row
44px compact, 56px comfortable (toggle). `1px` hairline bottom border only. Hover: background to `--surface-raised`, no transform, no shadow.

### 4.2 Badge / Chip
4px radius (never pill). 20px height. Micro-label type. 1px border at 20% of signal color; background at 8%.

### 4.3 Buttons
- **Primary:** 4px radius, `--signal-amber` fill, `--surface-canvas` text, 36px height. No gradient.
- **Secondary:** 4px radius, transparent, `1px solid var(--hairline-strong)`, primary text.
