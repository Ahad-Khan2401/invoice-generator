import { test } from "node:test";
import assert from "node:assert/strict";
import { DEFAULT_LAYOUT, sanitizeLayout, enforceLayoutPlan, isDefaultLayout, HEADER_PRESETS, LOGO_DIMS } from "../lib/layout.ts";
import { newDoc, sanitizeDoc } from "../lib/invoice-doc.ts";
import { documentData } from "../lib/validate.ts";
import { PLANS } from "../lib/plans.ts";

test("sanitizeLayout returns the default for garbage and keeps valid choices", () => {
  assert.deepEqual(sanitizeLayout(undefined), DEFAULT_LAYOUT);
  assert.deepEqual(sanitizeLayout("nope"), DEFAULT_LAYOUT);
  const l = sanitizeLayout({
    header: "centered", logoPos: "right", logoSize: "l", logoShape: "circle", sectionOrder: "notes-first",
    show: { email: false, phone: "yes", address: false },
  });
  assert.equal(l.header, "centered");
  assert.equal(l.logoPos, "right");
  assert.equal(l.logoSize, "l");
  assert.equal(l.logoShape, "circle");
  assert.equal(l.sectionOrder, "notes-first");
  assert.equal(l.show.email, false);
  assert.equal(l.show.phone, true);          // non-boolean → default
  assert.equal(l.show.address, false);
  assert.equal(l.show.itemNumbers, true);    // missing → default
});

test("sanitizeLayout rejects unknown enum values and hostile keys", () => {
  const l = sanitizeLayout({ header: "javascript:alert(1)", logoPos: "up", logoSize: "xxl", logoShape: "star", sectionOrder: "x", __proto__: { polluted: 1 } });
  assert.equal(l.header, "classic");
  assert.equal(l.logoPos, "left");
  assert.equal(l.logoSize, "m");
  assert.equal(l.logoShape, "original");
  assert.equal(l.sectionOrder, "bank-first");
  assert.equal("polluted" in l, false);
});

test("plan gating: free falls back to free options, paid keeps everything", () => {
  const pro = sanitizeLayout({ header: "reversed", sectionOrder: "notes-first", logoSize: "l", logoPos: "center" });
  const free = enforceLayoutPlan(pro, false);
  assert.equal(free.header, "classic");
  assert.equal(free.sectionOrder, "bank-first");
  assert.equal(free.logoSize, "l");           // logo size/position are free
  assert.equal(free.logoPos, "center");
  assert.deepEqual(enforceLayoutPlan(pro, true), pro);
  assert.equal(enforceLayoutPlan(sanitizeLayout({ header: "stacked" }), false).header, "stacked");
});

test("plan config: only paid plans include advanced layouts", () => {
  assert.equal(PLANS.free.limits.advancedLayouts, false);
  assert.equal(PLANS.pro.limits.advancedLayouts, true);
  assert.equal(PLANS.business.limits.advancedLayouts, true);
  // every header marked pro in the UI list is exactly the set the enforcer downgrades
  const proHeaders = HEADER_PRESETS.filter((p) => p.pro).map((p) => p.key).sort();
  for (const h of proHeaders) assert.equal(enforceLayoutPlan({ ...DEFAULT_LAYOUT, header: h }, false).header, "classic");
  for (const h of HEADER_PRESETS.filter((p) => !p.pro)) assert.equal(enforceLayoutPlan({ ...DEFAULT_LAYOUT, header: h.key }, false).header, h.key);
});

test("logo dimensions grow with size", () => {
  assert.ok(LOGO_DIMS.s.h < LOGO_DIMS.m.h && LOGO_DIMS.m.h < LOGO_DIMS.l.h);
  assert.ok(LOGO_DIMS.s.maxW < LOGO_DIMS.m.maxW && LOGO_DIMS.m.maxW < LOGO_DIMS.l.maxW);
});

test("isDefaultLayout", () => {
  assert.equal(isDefaultLayout(DEFAULT_LAYOUT), true);
  assert.equal(isDefaultLayout({ ...DEFAULT_LAYOUT, logoSize: "l" }), false);
});

test("documents carry a layout: new docs default, old saved docs gain one, imports are sanitised", () => {
  assert.deepEqual(newDoc().layout, DEFAULT_LAYOUT);
  const old = sanitizeDoc({ docType: "invoice", items: [{ id: 1, desc: "x", qty: 1, rate: 2 }] }); // saved before layouts existed
  assert.deepEqual(old.layout, DEFAULT_LAYOUT);
  const withLayout = sanitizeDoc({ layout: { header: "stacked", logoShape: "rounded" } });
  assert.equal(withLayout.layout.header, "stacked");
  assert.equal(withLayout.layout.logoShape, "rounded");
  assert.equal(withLayout.layout.logoSize, "m");
});

test("the save API sanitiser keeps layout and drops junk", () => {
  const d = documentData({ docType: "invoice", layout: { header: "reversed", logoPos: "right", extra: 1 } }) as { layout: typeof DEFAULT_LAYOUT };
  assert.equal(d.layout.header, "reversed");
  assert.equal(d.layout.logoPos, "right");
  assert.equal("extra" in d.layout, false);
  const none = documentData({ docType: "invoice" }) as { layout: typeof DEFAULT_LAYOUT };
  assert.deepEqual(none.layout, DEFAULT_LAYOUT);
});
