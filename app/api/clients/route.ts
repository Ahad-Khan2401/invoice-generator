/**
 * /api/clients — client directory for the signed-in user
 *
 *   GET    /api/clients?q=      → { clients: [...] }
 *   POST   /api/clients         → upsert by (email_hash, name) { id?, name, email, phone, address }
 *   DELETE /api/clients?id=     → remove
 *
 * Free: 5 clients · Pro/Business: unlimited (lib/plans.ts).
 */
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/pro-token";
import { getDb, isDbReady } from "@/lib/db";
import { resolvePlan } from "@/lib/entitlements";
import { planFor } from "@/lib/plans";
import { readJson, party, uuid, str } from "@/lib/validate";

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

export async function GET(req: NextRequest) {
  const a = await authed(req);
  if ("error" in a) return a.error;
  if (!isDbReady()) return NextResponse.json({ clients: [], dbReady: false, plan: a.plan }, { headers: NO_CACHE });
  const q = str(req.nextUrl.searchParams.get("q"), 80).replace(/[%_]/g, "");
  try {
    const db = getDb()!;
    const rows = q
      ? await db`SELECT id, name, email, phone, address, updated_at FROM clients WHERE email_hash = ${a.p.emailHash} AND name ILIKE ${"%" + q + "%"} ORDER BY name ASC LIMIT 200`
      : await db`SELECT id, name, email, phone, address, updated_at FROM clients WHERE email_hash = ${a.p.emailHash} ORDER BY name ASC LIMIT 500`;
    return NextResponse.json({ clients: rows, dbReady: true, plan: a.plan, limit: Number.isFinite(a.limits.clients) ? a.limits.clients : null }, { headers: NO_CACHE });
  } catch (e) {
    console.error("[clients/GET]", e);
    return NextResponse.json({ error: "Failed to load clients" }, { status: 500, headers: NO_CACHE });
  }
}

export async function POST(req: NextRequest) {
  const a = await authed(req);
  if ("error" in a) return a.error;
  let body: Record<string, unknown>;
  try { body = await readJson<Record<string, unknown>>(req, 16 * 1024); }
  catch { return NextResponse.json({ error: "Invalid body" }, { status: 400, headers: NO_CACHE }); }
  if (!isDbReady()) return NextResponse.json({ saved: false, reason: "db_not_configured" }, { headers: NO_CACHE });

  const c = party(body);
  if (!c.name.trim()) return NextResponse.json({ saved: false, error: "Client name is required" }, { status: 400, headers: NO_CACHE });
  const id = uuid(body.id);
  const db = getDb()!;

  try {
    if (id) {
      const upd = await db`
        UPDATE clients SET name = ${c.name}, email = ${c.email}, phone = ${c.phone}, address = ${c.address}, updated_at = NOW()
         WHERE id = ${id} AND email_hash = ${a.p.emailHash} RETURNING id` as { id: string }[];
      if (upd.length) return NextResponse.json({ saved: true, id, plan: a.plan }, { headers: NO_CACHE });
    }
    // Upsert by name (case-insensitive) so re-using a client doesn't duplicate it
    const existing = await db`
      SELECT id FROM clients WHERE email_hash = ${a.p.emailHash} AND LOWER(name) = LOWER(${c.name}) LIMIT 1` as { id: string }[];
    if (existing.length) {
      await db`UPDATE clients SET email = ${c.email}, phone = ${c.phone}, address = ${c.address}, updated_at = NOW() WHERE id = ${existing[0].id}`;
      return NextResponse.json({ saved: true, id: existing[0].id, plan: a.plan }, { headers: NO_CACHE });
    }
    const countRows = await db`SELECT COUNT(*)::int AS count FROM clients WHERE email_hash = ${a.p.emailHash}` as { count: number }[];
    if (Number.isFinite(a.limits.clients) && (countRows[0]?.count ?? 0) >= a.limits.clients) {
      return NextResponse.json({ saved: false, reason: "limit", limit: a.limits.clients, plan: a.plan }, { status: 402, headers: NO_CACHE });
    }
    const rows = await db`
      INSERT INTO clients (email_hash, name, email, phone, address) VALUES (${a.p.emailHash}, ${c.name}, ${c.email}, ${c.phone}, ${c.address}) RETURNING id` as { id: string }[];
    return NextResponse.json({ saved: true, id: rows[0]?.id, plan: a.plan }, { headers: NO_CACHE });
  } catch (e) {
    console.error("[clients/POST]", e);
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
    const rows = await getDb()!`DELETE FROM clients WHERE id = ${id} AND email_hash = ${a.p.emailHash} RETURNING id` as { id: string }[];
    if (!rows.length) return NextResponse.json({ error: "Not found" }, { status: 404, headers: NO_CACHE });
    return NextResponse.json({ ok: true }, { headers: NO_CACHE });
  } catch (e) {
    console.error("[clients/DELETE]", e);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500, headers: NO_CACHE });
  }
}
