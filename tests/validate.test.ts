import { test } from "node:test";
import assert from "node:assert/strict";
import { documentData, str, num, uuid, dataUrlImage, readJson, LIMITS } from "../lib/validate.ts";

test("str caps length and strips control characters", () => {
  assert.equal(str("ab\u0000c\u0007d", 10), "abcd");
  assert.equal(str("x".repeat(500), 20).length, 20);
  assert.equal(str(123), "");
});

test("num clamps and rejects NaN", () => {
  assert.equal(num("12.5"), 12.5);
  assert.equal(num("abc", 7), 7);
  assert.equal(num(1e20, 0, 0, 100), 100);
});

test("uuid and data-url image validation", () => {
  assert.equal(uuid("3f2a9b1e-8c4d-4a2b-9f0e-1234567890ab"), "3f2a9b1e-8c4d-4a2b-9f0e-1234567890ab");
  assert.equal(uuid("not-a-uuid"), null);
  assert.equal(dataUrlImage("data:image/png;base64,AAAA"), "data:image/png;base64,AAAA");
  assert.equal(dataUrlImage("data:text/html;base64,AAAA"), null);
  assert.equal(dataUrlImage("data:image/png;base64," + "A".repeat(LIMITS.logoBytes + 10)), null);
});

test("documentData normalises a saved document and drops unknown keys", () => {
  const d = documentData({
    docType: "estimate", status: "weird", taxType: "inclusive", discType: "fixed",
    tax: "15", discount: "10", color: "#ABCDEF", template: "minimal", paper: "letter",
    items: [{ desc: "a", qty: "1.5", rate: "20" }], extra: { nested: true },
    meta: { no: "E-1", date: "2026-10-16", due: "bad" }, cur: { s: "$", l: "USD" },
  }) as Record<string, unknown>;
  assert.equal(d.docType, "estimate");
  assert.equal(d.status, "unpaid");
  assert.equal(d.taxType, "inclusive");
  assert.equal(d.tax, 15);
  assert.equal(d.color, "#ABCDEF");
  assert.equal((d.items as unknown[]).length, 1);
  assert.equal((d.meta as { due: string }).due, "");
  assert.equal("extra" in d, false);
});

test("readJson enforces the byte cap", async () => {
  const big = new Request("http://x", { method: "POST", body: "x".repeat(2000) });
  await assert.rejects(() => readJson(big, 1000), /payload_too_large/);
  const bad = new Request("http://x", { method: "POST", body: "{not json" });
  await assert.rejects(() => readJson(bad, 1000), /invalid_json/);
  const ok = new Request("http://x", { method: "POST", body: JSON.stringify({ a: 1 }) });
  assert.deepEqual(await readJson(ok, 1000), { a: 1 });
});
