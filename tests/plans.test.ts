import { test } from "node:test";
import assert from "node:assert/strict";
import { PLANS, planFor, statusGrantsAccess, priceLabel, planFromVariant } from "../lib/plans.ts";

test("plan lookup falls back to free", () => {
  assert.equal(planFor("pro").key, "pro");
  assert.equal(planFor("nope").key, "free");
  assert.equal(planFor(null).key, "free");
});

test("free plan never advertises paid-only entitlements", () => {
  const f = PLANS.free.limits;
  assert.equal(f.whiteLabel, false);
  assert.equal(f.adFree, false);
  assert.equal(f.premiumTemplates, false);
  assert.equal(Number.isFinite(f.savedDocuments), true);
});

test("subscription statuses", () => {
  assert.equal(statusGrantsAccess("active"), true);
  assert.equal(statusGrantsAccess("on_trial"), true);
  assert.equal(statusGrantsAccess("past_due"), true);
  assert.equal(statusGrantsAccess("expired"), false);
  assert.equal(statusGrantsAccess("unpaid"), false);
  assert.equal(statusGrantsAccess("cancelled", new Date(Date.now() + 86_400_000).toISOString()), true);
  assert.equal(statusGrantsAccess("cancelled", new Date(Date.now() - 86_400_000).toISOString()), false);
  assert.equal(statusGrantsAccess(null), false);
});

test("price label matches the live Lemon Squeezy product", () => {
  assert.equal(priceLabel(PLANS.pro), "$5.99 / month");
  assert.equal(planFromVariant("unknown"), "pro");
});
