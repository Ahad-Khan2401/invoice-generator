/* ───────────────────────────────────────────────
   Brand constants — the logo's own colours.
   Logo: red "PDF", navy "Bill", blue "Builder".
   The site is ink on paper with red as the single accent; navy is the
   default document colour (an invoice that looks like a printed one).
─────────────────────────────────────────────── */
export const BRAND = {
  red:   "#E5252B",   // fills, stamps, rules — white text on it is ≥4.5:1 for bold/large
  redInk:"#B91C26",   // red used as TEXT on paper (≥5.5:1)
  navy:  "#17243F",   // logo "Bill"; default document colour
  blue:  "#1F6FE6",   // logo "Builder"
  ink:   "#151A24",   // text and primary buttons
  paper: "#FAF8F3",   // page background
} as const;

/** Default accent colour of a new document. */
export const DEFAULT_COLOR: string = BRAND.navy;
