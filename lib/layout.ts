/**
 * lib/layout.ts — user-controlled document layout (header design, logo
 * placement/size/shape, which contact details show, section order).
 *
 * Pure data + sanitiser, shared by the generator, the save APIs and tests.
 * Everything is rendered by InvoicePreview, so the PDF always matches.
 *
 * Plan gating (UI-level, like premium templates — the PDF is generated in the
 * browser): header designs "reversed" and "centered" and the "notes-first"
 * section order need a plan with `advancedLayouts`. Free users keep logo
 * position/size/shape, the "classic" and "stacked" headers and all show/hide
 * toggles.
 */

export type HeaderPreset = "classic" | "reversed" | "centered" | "stacked";
export type LogoPos = "left" | "center" | "right";
export type LogoSize = "s" | "m" | "l";
export type LogoShape = "original" | "rounded" | "circle";
export type SectionOrder = "bank-first" | "notes-first";

export interface LayoutShow {
  email: boolean;
  phone: boolean;
  address: boolean;
  statusBadge: boolean;
  itemNumbers: boolean;
}

export interface Layout {
  header: HeaderPreset;
  logoPos: LogoPos;
  logoSize: LogoSize;
  logoShape: LogoShape;
  sectionOrder: SectionOrder;
  show: LayoutShow;
}

export const HEADER_PRESETS: { key: HeaderPreset; name: string; hint: string; pro: boolean }[] = [
  { key: "classic",  name: "Classic",  hint: "You on the left, document details on the right", pro: false },
  { key: "stacked",  name: "Stacked",  hint: "Your details on top, document details below",    pro: false },
  { key: "reversed", name: "Reversed", hint: "Document details left, your details right",      pro: true  },
  { key: "centered", name: "Centered", hint: "Everything centred, like a letterhead",          pro: true  },
];

export const ADVANCED_HEADERS: HeaderPreset[] = ["reversed", "centered"];

export const DEFAULT_LAYOUT: Layout = {
  header: "classic",
  logoPos: "left",
  logoSize: "m",
  logoShape: "original",
  sectionOrder: "bank-first",
  show: { email: true, phone: true, address: true, statusBadge: true, itemNumbers: true },
};

/** Logo box in CSS px (the page is laid out at a fixed 96-dpi width). */
export const LOGO_DIMS: Record<LogoSize, { h: number; maxW: number }> = {
  s: { h: 36, maxW: 100 },
  m: { h: 50, maxW: 140 },
  l: { h: 76, maxW: 210 },
};

const HEADERS: readonly HeaderPreset[] = ["classic", "reversed", "centered", "stacked"];
const POS: readonly LogoPos[] = ["left", "center", "right"];
const SIZES: readonly LogoSize[] = ["s", "m", "l"];
const SHAPES: readonly LogoShape[] = ["original", "rounded", "circle"];
const ORDERS: readonly SectionOrder[] = ["bank-first", "notes-first"];

function pick<T extends string>(v: unknown, allowed: readonly T[], fallback: T): T {
  return typeof v === "string" && (allowed as readonly string[]).includes(v) ? (v as T) : fallback;
}
const bool = (v: unknown, d: boolean) => (typeof v === "boolean" ? v : d);

/** Normalise anything (storage, network, imported file) into a valid Layout. */
export function sanitizeLayout(input: unknown): Layout {
  const o = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const s = (o.show && typeof o.show === "object" ? o.show : {}) as Record<string, unknown>;
  const d = DEFAULT_LAYOUT;
  return {
    header:       pick(o.header, HEADERS, d.header),
    logoPos:      pick(o.logoPos, POS, d.logoPos),
    logoSize:     pick(o.logoSize, SIZES, d.logoSize),
    logoShape:    pick(o.logoShape, SHAPES, d.logoShape),
    sectionOrder: pick(o.sectionOrder, ORDERS, d.sectionOrder),
    show: {
      email:       bool(s.email, d.show.email),
      phone:       bool(s.phone, d.show.phone),
      address:     bool(s.address, d.show.address),
      statusBadge: bool(s.statusBadge, d.show.statusBadge),
      itemNumbers: bool(s.itemNumbers, d.show.itemNumbers),
    },
  };
}

/** Fall back to free options when the plan does not include advanced layouts
    (e.g. a saved Pro document opened after a downgrade). */
export function enforceLayoutPlan(layout: Layout, advancedLayouts: boolean): Layout {
  if (advancedLayouts) return layout;
  return {
    ...layout,
    header: ADVANCED_HEADERS.includes(layout.header) ? DEFAULT_LAYOUT.header : layout.header,
    sectionOrder: layout.sectionOrder === "notes-first" ? DEFAULT_LAYOUT.sectionOrder : layout.sectionOrder,
  };
}

export function isDefaultLayout(l: Layout): boolean {
  return JSON.stringify(l) === JSON.stringify(DEFAULT_LAYOUT);
}
