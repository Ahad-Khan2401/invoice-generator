# Design

> Visual system for PDF Bill Builder, captured from the live code
> (`app/globals.css`, `lib/brand.ts`, `components/*`). Register: **product** for the
> generator and dashboard, **brand** for the landing, pricing, templates and blog pages.
> Direction: **Paper & ink**, chosen by the owner in October 2026.

## Theme

A printed document on a desk. Warm off-white paper, ink-black type and buttons, serif
headings, and one accent: the red from the logo's "PDF" mark. The invoice itself is the
hero, so wherever the old design used a card with an icon, this one shows a real rendered
document (`components/Specimen.tsx`) or a plain ruled list.

Scene: a freelancer at a desk or a job site, mid-afternoon, trying to get one invoice out
the door. Light theme, no dark mode.

Replaces the earlier indigo-on-cream look, which read as a generic AI SaaS template
(see PRODUCT.md anti-references).

## Color

Strategy: **Restrained**. Paper and ink carry the page, red is under 10% of any screen.
All values live in `lib/brand.ts` (document colours) and `app/globals.css` (UI tokens).

| Token | Value | Role |
|---|---|---|
| `--paper` | `#faf8f3` | Page canvas |
| `--paper-2` | `#f3efe6` | Quiet panels (guide, summary, landing facts) |
| `--sheet` | `#ffffff` | Form surface, specimen pages |
| `--rule` | `#e3ddd0` | Hairlines between rows |
| `--rule-strong` | `#cfc8b8` | Input and card borders |
| `--ink` | `#151a24` | Headings, body, primary buttons, footer rule |
| `--ink-2` | `#3a4150` | Body copy |
| `--ink-3` | `#5b6272` | Captions (5.6:1 on paper) |
| `--red` | `#e5252b` | Logo red: stamps, fills, active underline, Pro band button |
| `--red-ink` | `#b91c26` | Red used as **text** or link (6:1 on paper) |
| `--navy` | `#17243f` | Default colour of a generated document |

Tailwind's indigo, violet and slate ramps are re-pointed in `@theme` to ink, red and a
warm grey, so legacy utility classes inherit the palette. New code should use `ink-*`,
`accent-*`, `paper`, and the `--rule` variables.

Rules:
- Red text always uses `--red-ink`. The brighter `--red` is for fills, borders and stamps.
- Never a red or tinted side stripe on a card or callout. Use a full hairline or nothing.
- Never gradients on text. No glass.
- Document colours are separate from UI colours. Free swatches: Navy `#17243F`, Red
  `#E5252B`, Blue `#1F6FE6`, Emerald, Amber, Indigo. Pro adds twelve more.

## Typography

- **Display:** Source Serif 4 (variable, optical size axis) for h1 to h3, prices and
  numbers that should feel printed. Loaded by `next/font` as `--font-source-serif`.
- **UI and body:** Public Sans as `--font-public-sans`. 14 to 15px body, line-height 1.6.
- **Document only:** Inter as `--font-inter`, used by `InvoicePreview` so the PDF output is
  unchanged by site redesigns.
- Serif is for headings and money. Never set long body copy or form labels in serif.
- h1 clamp max stays under 4rem. Use `text-wrap: balance` on headings.
- Tabular numerals on every amount.

## Layout

- One content column: **1152px** wide. Header, footer, hero, tool and homepage sections
  all share it, so left edges line up. Article and prose pages use narrower measures
  (about 65ch).
- Generator grid: form on the left, live preview on the right, stacks below 1024px.
- Radii are small and print-like: 6px inputs and buttons, 8px panels, 12px at most.
- Shadows are for paper only (specimens, preview sheet, modals). Panels use hairlines.
- Lists of links, templates, calculators and guides are **ruled lists** (`.rule-list`),
  not card grids. A real sequence is a numbered ruled list (`.home-steps`). One numbered
  list per page at most.

## Components

- **Specimen** (`components/Specimen.tsx`, data in `lib/specimens.ts`): renders the real
  `InvoicePreview` scaled to its container. Fictional businesses only. Optional "Paid"
  stamp for receipts.
- **Stamp** (`.stamp`): a rotated red outline label. Used once per page at most, on the
  hero or the 404.
- **Buttons:** primary is ink fill with white text. Secondary is a 2px ink outline.
  The only red button is the Pro band call to action on the dark section.
- **Header:** flat, sticky, paper background, hairline underneath, active link has a red
  underline. **Footer:** 2px ink rule on top, serif tagline, link columns.
- **PageHero:** serif h1 plus a short red rule. The `badge` prop is accepted for
  compatibility but not drawn. Do not add eyebrows.
- **Pro band** (homepage): the only dark section. Ink background, serif headline, two
  specimen pages (Minimal, Bold), live price from `lib/plans.ts`.
- **Ad slots (`.ad-wrap`):** centred, reserved height, labelled "Advertisement".
- **Modals:** ProModal and DownloadAdModal use paper, hairlines and the ink button.

## Motion

CSS only, 160 to 220ms, ease-out-expo family, no bounce. `prefers-reduced-motion`
disables animation and smooth scroll. Reveals enhance content that is already visible.

## Do not

- Add eyebrow pills, "01 / 02 / 03" section markers, or icon-in-a-square card grids.
- Reintroduce indigo, violet gradients, or glass panels.
- Change the document font or default document colour without checking the PDF output.
- Put prices in copy. Read them from `lib/plans.ts` (`priceLabel`).
