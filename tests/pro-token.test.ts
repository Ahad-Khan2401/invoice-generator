import { test } from "node:test";
import assert from "node:assert/strict";
process.env.PRO_JWT_SECRET = "test-secret-not-for-production";
const { createToken, verifyToken, hashEmail } = await import("../lib/pro-token.ts");

test("token round-trip for every plan", () => {
  const h = hashEmail("Person@Example.com ");
  assert.equal(h, hashEmail("person@example.com"));
  for (const plan of ["free", "pro", "business"] as const) {
    const { token } = createToken(h, plan);
    const v = verifyToken(token);
    assert.equal(v.valid, true);
    assert.equal(v.plan, plan);
    assert.equal(v.isPro, plan !== "free");
    assert.equal(v.emailHash, h);
  }
});

test("tampering is rejected", () => {
  const h = hashEmail("a@b.c");
  const { token } = createToken(h, "free");
  const [eh, exp, , sig] = token.split(".");
  assert.equal(verifyToken(`${eh}.${exp}.1.${sig}`).valid, false);              // plan escalation
  assert.equal(verifyToken(`${eh}.${Number(exp) + 1000}.0.${sig}`).valid, false); // expiry change
  assert.equal(verifyToken(token.slice(0, -1) + "0").valid, false);              // signature bit flip
  assert.equal(verifyToken("garbage").valid, false);
  assert.equal(verifyToken(`${eh}.${Date.now() - 1}.0.${sig}`).valid, false);    // expired
});
