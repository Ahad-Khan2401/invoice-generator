import { test } from "node:test";
import assert from "node:assert/strict";
import { newDoc, sanitizeDoc, convertToInvoice, receiptFromInvoice, safeFileName } from "../lib/invoice-doc.ts";

test("sanitizeDoc drops unknown/hostile input and keeps valid fields", () => {
  const d = sanitizeDoc({
    docType: "quotation",
    from: { name: "<script>alert(1)</script>", email: "a@b.c", bogus: 1 },
    items: [{ id: "x", desc: 123, qty: "2", rate: "9.5" }, null, "junk"],
    tax: "20", taxType: "inclusive", discount: -4, discType: "fixed",
    cur: { s: "£", l: "GBP" }, color: "javascript:alert(1)", template: "bold", paper: "letter",
    brandLogo: "https://evil.example/x.png", meta: { no: "Q-1", date: "not-a-date", due: "2026-02-02" },
  });
  assert.equal(d.docType, "quotation");
  assert.equal(d.from.name, "<script>alert(1)</script>"); // stored as text; React escapes on render
  assert.equal(d.items.length, 3);
  assert.equal(d.items[0].qty, 2);
  assert.equal(d.items[0].rate, 9.5);
  assert.equal(d.items[0].desc, "");
  assert.equal(d.tax, 20);
  assert.equal(d.taxType, "inclusive");
  assert.equal(d.discount, 0);
  assert.equal(d.cur.l, "GBP");
  assert.equal(d.color, "#4f46e5");          // invalid colour -> default
  assert.equal(d.template, "bold");
  assert.equal(d.paper, "letter");
  assert.equal(d.brandLogo, null);           // only data: images allowed
  assert.equal(d.meta.no, "Q-1");
  assert.match(d.meta.date, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(d.meta.due, "2026-02-02");
});

test("sanitizeDoc always yields at least one item", () => {
  const d = sanitizeDoc({ items: [] });
  assert.equal(d.items.length, 1);
});

test("conversions", () => {
  const q = newDoc({ docType: "quotation" });
  q.items = [{ id: 1, desc: "Design", qty: 1, rate: 500 }];
  const inv = convertToInvoice(q);
  assert.equal(inv.docType, "invoice");
  assert.equal(inv.status, "unpaid");
  assert.equal(inv.meta.no, "INV-001");
  assert.equal(inv.items[0].rate, 500);

  const paid = { ...inv, status: "paid" as const, meta: { ...inv.meta, no: "INV-042" } };
  const r = receiptFromInvoice(paid);
  assert.equal(r.docType, "receipt");
  assert.equal(r.status, "paid");
  assert.equal(r.meta.no, "RCT-042");
  assert.match(r.meta.notes, /INV-042/);
});

test("safeFileName strips unsafe characters", () => {
  assert.equal(safeFileName("INV/001 ✓", "invoice", "pdf"), "INV-001.pdf");
  assert.equal(safeFileName("", "receipt", "json"), "receipt.json");
});
