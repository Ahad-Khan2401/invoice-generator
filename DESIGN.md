# Design

> Visual system for PDF Bill Builder, captured from the live code
> (`app/globals.css`, `lib/config.ts`, `components/*`). Register: **product**.
> Keep variants on-brand by reading this before design work.

## Theme

Light, calm, "clean office paper" — a trustworthy productivity tool, not a flashy
SaaS landing. Near-white indigo-tinted canvas, white surfaces, indigo as the single
brand accent. The invoice preview itself is the visual centrepiece; the UI around it
stays quiet so the document looks like the hero.

**Known tension (see PRODUCT.md anti-references):** the current execution sits close
to the generic "indigo-on-cream AI SaaS" default. Future work should carry the brand
through typography rhythm, spacing, and one confident expression rather than more
indigo cards.

## Color

Format: hex today (migrate to OKLCH when tokens are next refactored). Single-accent
"restrained" strategy — indigo ≤ ~10% of surface, everything else neutral.

### Core tokens (`app/globals.css` / `lib/config.ts`)

| Token | Value | Role |
|---|---|---|
| `--bg` | `#f5f7ff` | Page canvas (indigo-tinted near-white) |
| `--primary` | `#4f46e5` | Brand indigo — CTAs, accents, links, active states |
| `--border` | `#e4e9f2` | Hairline borders on cards, inputs |
| `--text-1` | `#0d1117` | Primary ink (headings, key values) |
| `--text-2` | `#4b5563` | Body text |
| `--text-3` | `#9ca3af` | Muted / captions — **verify ≥4.5:1; borderline on tint** |
| surface | `#ffffff` | Cards, form, preview paper |

### Semantic / doc-type accents

- Invoice indigo `#4f46e5` · Receipt emerald `#10b981` · Quotation amber `#f59e0b`
- Paid `#16a34a` on `#dcfce7` · Unpaid amber · Pro violet `#7c3aed` on `#faf5ff`
- Discount/negative red `#ef4444`

### Invoice color palettes (user-selectable)

- **Free (6):** Indigo `#4f46e5`, Sky `#0ea5e9`, Emerald `#10b981`, Amber `#f59e0b`,
  Red `#ef4444`, Violet `#8b5cf6`.
- **Pro (12):** deep/muted set — Slate, Crimson `#7f1d1d`, Forest, Navy, Brown,
  Purple, Teal, Carbon, Rose, Ink, Pine, Maroon.

### Contrast rule

Body ≥4.5:1, large text ≥3:1. `--text-3` (#9ca3af) on `#f5f7ff` is the risk spot —
prefer `--text-2` for anything users must read.

## Typography

- **Family:** Inter (`next/font`, `display: swap`), fallback `system-ui`. Single
  family in multiple weights — no secondary font. If a display/editorial contrast is
  ever wanted, pair on a real axis (serif or humanist), never a second geometric sans.
- **Base:** 14px body, `line-height: 1.6`.
- **Headings:** weight 700–900, `letter-spacing: -0.025em` (display floor -0.04em).
  Use `text-wrap: balance` on h1–h3.
- **Article prose (`.seo-prose`):** h2 `clamp(20px,3vw,26px)` / h3 `clamp(16px,2.4vw,19px)`;
  body 15px / line-height 1.75; cap measure at 65–75ch (article max-width ~820px ≈ ok).
- **Numerals:** `font-variant-numeric: tabular-nums` on all money/totals.
- **Hero heading ceiling:** clamp max ≤ 6rem.

## Layout & Spacing

- **Container widths:** tool `max-width: 1200px`; article/prose `~820px`;
  page shells `3xl–5xl` via `PageShell`.
- **Generator grid:** `grid-cols-1 lg:grid-cols-[500px_1fr]`, gap 8 (form left,
  live preview right; stacks on mobile).
- **Radii:** cards/inputs `--radius-md: 14px`; pills/buttons 10–12px; large cards
  up to 24px (`rounded-3xl`).
- **Shadow:** `--shadow-card: 0 2px 8px rgba(0,0,0,.04), 0 8px 32px rgba(15,23,42,.07)`.
  Preview paper uses a deeper lift. Keep shadows soft, never harsh.
- **Responsive:** breakpoints at 1023px (tool leaves its own scroll area) and 640px
  (tighter paddings). Grids prefer `flex-wrap` / `auto-fit minmax` over fixed columns.
- **Cards:** used heavily today. Prefer full borders + soft shadow; never nested
  cards, never side-stripe borders.

## Components

- **Buttons:** `font: inherit`, no border, `transition: all .2s`, `:active` scale .97.
  Primary = indigo fill white text; secondary = white + `--border`; Pro = violet
  dashed/tinted.
- **Inputs:** white, `--border`, focus tints toward the active accent; number spinners
  stripped, native date picker dimmed.
- **Preview paper:** A4 auto-scaled to fit; accent stripe / band / plain header per
  template (`tplTokens()`), optional watermark, tabular totals.
- **Templates:** Classic (free, accent stripe) · Minimal (Pro, black/white, no stripe)
  · Bold (Pro, full-colour header band). Mini CSS mockups in `TemplateStyleCards`.
- **FAQ:** native `<details>` accordion, `+`/`−` marker, tinted `#f9fbff` card.
- **Ad slots (`.ad-wrap`):** centered, `min-height:100px` reserves space (low CLS),
  overflow-hidden safety, "Advertisement" label. Kept polite and secondary.
- **Modals:** ProModal (gradient indigo header), DownloadAdModal (ad-free progress +
  save/upgrade CTA). Close on Esc/backdrop.
- **Footer:** taped-card motif, 4 balanced link columns.

## Motion

- CSS-driven only (framer-motion removed for bundle size). Durations 160–220ms,
  `cubic-bezier(.16,1,.3,1)` (ease-out-expo family) — no bounce/elastic.
- Existing: drawer slide-in, item-row enter, `:active` button press, smooth scroll.
- **`prefers-reduced-motion: reduce`** disables animations + smooth scroll (in place;
  extend to any new motion). Reveals must enhance already-visible content, never gate it.

## Register-specific notes

- **Product surfaces** (generator, dashboard, modals): clarity and speed win. Quiet UI,
  strong preview, obvious primary action, honest upsells.
- **Brand surfaces** (landing pages, blog, /pricing, /templates): more room for
  expression, but stay within this palette + type system. Avoid eyebrow kickers and
  numbered section markers as default scaffolding.
