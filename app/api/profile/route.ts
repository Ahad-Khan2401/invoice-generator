/**
 * /api/profile — saved business profile(s) for the signed-in user
 *
 *   GET /api/profile         → { profiles: [...], plan }
 *   PUT /api/profile         → upsert { id?, name, data }   (data = sender details, logo, colour, currency, notes, bank)
 *   DELETE /api/profile?id=  → remove a profile
 *
 * Free: 1 profile · Pro: 3 · Business: unlimited (lib/plans.ts).
 * Guests keep using the localStorage profile; this syncs it across devices.
 */
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/pro-token";
import { getDb, isDbReady } from "@/lib/db";
import { resolvePlan } from "@/lib/entitlements";
import { planFor } from "@/lib/plans";
import { readJson, str, party, dataUrlImage, uuid, LIMITS } from "@/lib/validate";

const NO_CACHE = { "Cache-Control": "no-store" };

async function authed(req: NextRequest) {
  const h = req.headers.get("authorization") ?? "";
  const raw = h.startsWith("Bearer ") ? h.slice(7) : "";
  if (!raw) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: NO_CACHE }) };
  const p = verifyToken(raw);
  if (!p.valid) return { error: NextResponse.json({ error: "Invalid or expired session" }, { status: 401, headers: NO_CACHE }) };
  const plan = await resolvePlan(p.emailHash, p.plan);
  return { p, plan, limits: planFor(plan).limits };
}

function profileData(v: unknown) {
  const o = (v && typeof v === "object" ? v : {}) as Record<string, unknown>;
  const cur = (o.cur && typeof o.cur === "object" ? o.cur : {}) as Record<string, unknown>;
  return {
    from:        party(o.from),
    brandLogo:   dataUrlImage(o.brandLogo),
    color:       /^#[0-9a-f]{6}$/i.test(String(o.color ?? "")) ? String(o.color) : "#4f46e5",
    cur:         { s: str(cur.s, 6) || "$", l: str(cur.l, 6) || "USD" },
    bankDetails: str(o.bankDetails, 2000),
    notes:       str(o.notes, LIMITS.longText),
    taxLabel:    str(o.taxLabel, 30),
    tax:         typeof o.tax === "number" && isFinite(o.tax) ? Math.max(0, Math.min(1000, o.tax)) : 0,
    numberPrefix: str(o.numberPrefix, 20),
  };
}

export async function GET(req: NextRequest) {
  const a = await authed(req);
  if ("error" in a) return a.error;
  if (!isDbReady()) return NextResponse.json({ profiles: [], dbReady: false, plan: a.plan }, { headers: NO_CACHE });
  try {
    const rows = await getDb()!`
      SELECT id, name, data, is_default, updated_at FROM profiles
       WHERE email_hash = ${a.p.emailHash} ORDER BY is_default DESC, updated_at DESC LIMIT 20`;
    return NextResponse.json({ profiles: rows, dbReady: true, plan: a.plan, limit: Number.isFinite(a.limits.businessProfiles) ? a.limits.businessProfiles : null }, { headers: NO_CACHE });
  } catch (e) {
    console.error("[profile/GET]", e);
    return NextResponse.json({ error: "Failed to load profiles" }, { status: 500, headers: NO_CACHE });
  }
}

export async function PUT(req: NextRequest) {
  const a = await authed(req);
  if ("error" in a) return a.error;
  let body: { id?: unknown; name?: unknown; data?: unknown; is_default?: unknown };
  try { body = await readJson(req, LIMITS.bodyBytes); }
  catch { return NextResponse.json({ error: "Invalid body" }, { status: 400, headers: NO_CACHE }); }
  if (!isDbReady()) return NextResponse.json({ saved: false, reason: "db_not_configured" }, { headers: NO_CACHE });

  const db = getDb()!;
  const id = uuid(body.id);
  const name = str(body.name, 80) || "My business";
  const data = JSON.stringify(profileData(body.data));
  const isDefault = body.is_default !== false;

  try {
    if (id) {
      const upd = await db`
        UPDATE profiles SET name = ${name}, data = ${data}, is_default = ${isDefault}, updated_at = NOW()
         WHERE id = ${id} AND email_hash = ${a.p.emailHash} RETURNING id` as { id: string }[];
      if (upd.length) {
        if (isDefault) await db`UPDATE profiles SET is_default = FALSE WHERE email_hash = ${a.p.emailHash} AND id <> ${id}`;
        return NextResponse.json({ saved: true, id, plan: a.plan }, { headers: NO_CACHE });
      }
    }
    const countRows = await db`SELECT COUNT(*)::int AS count FROM profiles WHERE email_hash = ${a.p.emailHash}` as { count: number }[];
    const count = countRows[0]?.count ?? 0;
    if (Number.isFinite(a.limits.businessProfiles) && count >= a.limits.businessProfiles) {
      // Free plan: replace the single existing profile instead of failing.
      if (a.limits.businessProfiles === 1) {
        const upd = await db`
          UPDATE profiles SET name = ${name}, data = ${data}, is_default = TRUE, updated_at = NOW()
           WHERE email_hash = ${a.p.emailHash} RETURNING id` as { id: string }[];
        return NextResponse.json({ saved: true, id: upd[0]?.id, replaced: true, plan: a.plan }, { headers: NO_CACHE });
      }
      return NextResponse.json({ saved: false, reason: "limit", limit: a.limits.businessProfiles, plan: a.plan }, { status: 402, headers: NO_CACHE });
    }
    if (isDefault) await db`UPDATE profiles SET is_default = FALSE WHERE email_hash = ${a.p.emailHash}`;
    const rows = await db`
      INSERT INTO profiles (email_hash, name, data, is_default) VALUES (${a.p.emailHash}, ${name}, ${data}, ${isDefault}) RETURNING id` as { id: string }[];
    return NextResponse.json({ saved: true, id: rows[0]?.id, plan: a.plan }, { headers: NO_CACHE });
  } catch (e) {
    console.error("[profile/PUT]", e);
    return NextResponse.json({ saved: false, reason: "db_error" }, { status: 500, headers: NO_CACHE });
  }
}

export async function DELETE(req: NextRequest) {
  const a = await authed(req);
  if ("error" in a) return a.error;
  const id = uuid(req.nextUrl.searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400, headers: NO_CACHE });
  if (!isDbReady()) return NextResponse.json({ ok: false, reason: "db_not_configured" }, { headers: NO_CACHE });
  try {
    const rows = await getDb()!`DELETE FROM profiles WHERE id = ${id} AND email_hash = ${a.p.emailHash} RETURNING id` as { id: string }[];
    if (!rows.length) return NextResponse.json({ error: "Not found" }, { status: 404, headers: NO_CACHE });
    return NextResponse.json({ ok: true }, { headers: NO_CACHE });
  } catch (e) {
    console.error("[profile/DELETE]", e);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500, headers: NO_CACHE });
  }
}
