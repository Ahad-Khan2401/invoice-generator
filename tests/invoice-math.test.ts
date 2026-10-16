import { test } from "node:test";
import assert from "node:assert/strict";
import {
  round2, lineAmount, calcTotals, formatMoney, formatQty, nextInvoiceNumber, defaultNumber, addDays, isOverdue,
} from "../lib/invoice-math.ts";

test("round2 is half-up and epsilon-safe", () => {
  assert.equal(round2(1.005), 1.01);
  assert.equal(round2(2.675), 2.68);
  assert.equal(round2(-1.005), -1.01);
  assert.equal(round2(NaN), 0);
  assert.equal(round2(0.1 + 0.2), 0.3);
});

test("line amounts: fractional qty, decimal price, zero and negative values", () => {
  assert.equal(lineAmount({ qty: 1.5, rate: 33.33 }), 50);          // 49.995 -> 50.00
  assert.equal(lineAmount({ qty: 0, rate: 100 }), 0);
  assert.equal(lineAmount({ qty: 3, rate: 0 }), 0);
  assert.equal(lineAmount({ qty: -1, rate: 20 }), -20);              // credit line
  assert.equal(lineAmount({ qty: 2.333, rate: 10.1 }), 23.56);
});

test("exclusive tax + percentage discount", () => {
  const t = calcTotals([{ qty: 2, rate: 100 }, { qty: 1, rate: 50 }], { discount: 10, discType: "%", taxRate: 20, taxType: "exclusive" });
  assert.equal(t.subtotal, 250);
  assert.equal(t.discount, 25);
  assert.equal(t.afterDiscount, 225);
  assert.equal(t.tax, 45);
  assert.equal(t.taxIncluded, 0);
  assert.equal(t.total, 270);
});

test("inclusive tax does not change the total but reports the included portion", () => {
  const t = calcTotals([{ qty: 1, rate: 120 }], { discount: 0, discType: "%", taxRate: 20, taxType: "inclusive" });
  assert.equal(t.total, 120);
  assert.equal(t.tax, 0);
  assert.equal(t.taxIncluded, 20);
});

test("fixed discount is capped at the subtotal; discounts never go negative", () => {
  const t = calcTotals([{ qty: 1, rate: 40 }], { discount: 100, discType: "fixed", taxRate: 0, taxType: "exclusive" });
  assert.equal(t.discount, 40);
  assert.equal(t.total, 0);
  const u = calcTotals([{ qty: 1, rate: 40 }], { discount: -5, discType: "%", taxRate: 0, taxType: "exclusive" });
  assert.equal(u.discount, 0);
});

test("totals equal the sum of rounded displayed lines (no hidden cent drift)", () => {
  const items = Array.from({ length: 7 }, () => ({ qty: 1, rate: 0.335 })); // each shows 0.34
  const t = calcTotals(items, { discount: 0, discType: "%", taxRate: 0, taxType: "exclusive" });
  assert.equal(t.lines.every((l) => l === 0.34), true);
  assert.equal(t.subtotal, 2.38);
});

test("large invoice keeps precision", () => {
  const items = Array.from({ length: 300 }, (_, i) => ({ qty: i + 1, rate: 19.99 }));
  const t = calcTotals(items, { discount: 0, discType: "%", taxRate: 8.25, taxType: "exclusive" });
  assert.equal(t.subtotal, round2(items.reduce((s, it) => s + round2(it.qty * it.rate), 0)));
  assert.equal(t.total, round2(t.subtotal + t.tax));
});

test("money formatting with symbols and zero-decimal currencies", () => {
  assert.equal(formatMoney(1234.5, "$", "USD"), "$1,234.50");
  assert.equal(formatMoney(-12, "£", "GBP"), "−£12.00");
  assert.equal(formatMoney(1500, "¥", "JPY"), "¥1,500");
  assert.equal(formatMoney(99999.999, "₹", "INR"), "₹100,000.00");
  assert.equal(formatQty(2), "2");
  assert.equal(formatQty(1.5), "1.5");
});

test("invoice numbering increments and preserves padding/prefix", () => {
  assert.equal(nextInvoiceNumber("INV-001"), "INV-002");
  assert.equal(nextInvoiceNumber("INV-099"), "INV-100");
  assert.equal(nextInvoiceNumber("2026-0009"), "2026-0010");
  assert.equal(nextInvoiceNumber("7"), "8");
  assert.equal(nextInvoiceNumber("ABC"), "ABC-2");
  assert.equal(nextInvoiceNumber(""), "INV-001");
  assert.equal(defaultNumber("receipt"), "RCT-001");
  assert.equal(defaultNumber("estimate"), "EST-001");
});

test("dates: addDays and overdue detection", () => {
  assert.equal(addDays("2026-01-31", 30), "2026-03-02");
  assert.equal(isOverdue("2026-01-01", "unpaid", new Date("2026-02-01T00:00:00")), true);
  assert.equal(isOverdue("2026-01-01", "paid", new Date("2026-02-01T00:00:00")), false);
  assert.equal(isOverdue("2099-01-01", "unpaid", new Date("2026-02-01T00:00:00")), false);
  assert.equal(isOverdue("", "unpaid"), false);
});
