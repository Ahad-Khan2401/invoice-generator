/**
 * /api/invoices — saved documents for the authenticated user
 *
 *   GET    /api/invoices            list (newest first)      ?q=search ?status=unpaid|paid|overdue|draft
 *   GET    /api/invoices?id=<uuid>  one document with full form data
 *   POST   /api/invoices            save (download or draft)
 *   PATCH  /api/invoices            { id, status?: "paid"|"unpaid" }
 *   DELETE /api/invoices?id=<uuid>  delete one document
 *
 * Auth : Bearer {HMAC session token}. The plan is re-resolved server-side on
 *        every call (lib/entitlements) — the token flag is only a UI hint.
 * Limits come from lib/plans.ts (free: last N saved; oldest is replaced).
 * Every query is scoped by email_hash so users can never read/modify
 * another user's rows (single-tenant-per-row isolation).
 */
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/pro-token";
import { getDb, isDbReady } from "@/lib/db";
import { resolvePlan } from "@/lib/entitlements";
import { planFor } from "@/lib/plans";
import { documentData, readJson, str, num, oneOf, uuid, isoDate, LIMITS } from "@/lib/validate";
import { rateLimit, clientIp, tooMany } from "@/lib/rate-limit";

const NO_CACHE = { "Cache-Control": "no-store" };

/* ─── Auth ──────────────────────────────────────── */
function bearerToken(req: NextRequest): string {
  const h = req.headers.get("authorization") ?? "";
  return h.startsWith("Bearer ") ? h.slice(7) : "";
}

async function authed(req: NextRequest) {
  const rawToken = bearerToken(req);
  if (!rawToken) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: NO_CACHE }) };
  const p = verifyToken(rawToken);
  if (!p.valid) return { error: NextResponse.json({ error: "Invalid or expired session" }, { status: 401, headers: NO_CACHE }) };
  const plan = await resolvePlan(p.emailHash, p.plan);
  return { p, plan, limits: planFor(plan).limits };
}

function overdueExpr() {
  // SQL fragment semantics handled in JS below; kept for readability.
  return null;
}
void overdueExpr;

/* ─── GET ───────────────────────────────────────── */
export async function GET(req: NextRequest) {
  const a = await authed(req);
  if ("error" in a) return a.error;
  const { p, plan, limits } = a;

  if (!isDbReady()) {
    return NextResponse.json({ invoices: [], dbReady: false, plan }, { headers: NO_CACHE });
  }
  const db = getDb()!;

  const id = uuid(req.nextUrl.searchParams.get("id"));
  if (id) {
    try {
      const rows = await db`
        SELECT id, invoice_no, doc_type, status, is_draft, data
          FROM invoices
         WHERE id = ${id} AND email_hash = ${p.emailHash}
         LIMIT 1
      ` as { id: string; invoice_no: string; doc_type: string; status: string; is_draft: boolean; data: unknown }[];
      if (!rows.length) return NextResponse.json({ error: "Not found" }, { status: 404, headers: NO_CACHE });
      return NextResponse.json({ invoice: rows[0], plan }, { headers: NO_CACHE });
    } catch (e) {
      console.error("[invoices/GET?id]", e);
      return NextResponse.json({ error: "Failed to load document" }, { status: 500, headers: NO_CACHE });
    }
  }

  const q = str(req.nextUrl.searchParams.get("q"), 80).trim();
  const limit = Number.isFinite(limits.savedDocuments) ? limits.savedDocuments : 1000;

  try {
    const like = `%${q.replace(/[%_]/g, "")}%`;
    const rows = q
      ? await db`
          SELECT id, invoice_no, doc_type, client_name, total, currency, status, due_date, issue_date, is_draft, created_at, updated_at
            FROM invoices
           WHERE email_hash = ${p.emailHash}
             AND (invoice_no ILIKE ${like} OR client_name ILIKE ${like})
           ORDER BY created_at DESC
           LIMIT ${limit}`
      : await db`
          SELECT id, invoice_no, doc_type, client_name, total, currency, status, due_date, issue_date, is_draft, created_at, updated_at
            FROM invoices
           WHERE email_hash = ${p.emailHash}
           ORDER BY created_at DESC
           LIMIT ${limit}`;

    const countRows = await db`SELECT COUNT(*)::int AS count FROM invoices WHERE email_hash = ${p.emailHash}` as { count: number }[];

    return NextResponse.json(
      { invoices: rows, plan, isPro: plan !== "free", dbReady: true, total: countRows[0]?.count ?? 0, limit: Number.isFinite(limits.savedDocuments) ? limits.savedDocuments : null },
      { headers: NO_CACHE }
    );
  } catch (e) {
    console.error("[invoices/GET]", e);
    return NextResponse.json({ error: "Failed to load documents" }, { status: 500, headers: NO_CACHE });
  }
}

/* ─── POST — save ───────────────────────────────── */
export async function POST(req: NextRequest) {
  const rl = rateLimit(`inv-post:${clientIp(req)}`, 60, 60_000);
  if (!rl.ok) return tooMany(rl);

  const a = await authed(req);
  if ("error" in a) return a.error;
  const { p, plan, limits } = a;

  let body: Record<string, unknown>;
  try { body = await readJson<Record<string, unknown>>(req, LIMITS.bodyBytes); }
  catch (e) {
    const msg = e instanceof Error && e.message === "payload_too_large" ? "Document too large to save (try a smaller logo)." : "Invalid body";
    return NextResponse.json({ saved: false, error: msg }, { status: 400, headers: NO_CACHE });
  }

  if (!isDbReady()) {
    return NextResponse.json({ saved: false, reason: "db_not_configured" }, { headers: NO_CACHE });
  }
  const db = getDb()!;

  const data       = documentData(body.data);
  const invoiceNo  = str(body.invoice_no, 60) || (data.meta as { no: string }).no || "—";
  const docType    = (data.docType as string);
  const clientName = str(body.client_name) || (data.to as { name: string }).name || "—";
  const total      = num(body.total, 0, -1e12, 1e12);
  const currency   = str(body.currency, 6) || (data.cur as { l: string }).l || "USD";
  const status     = docType === "receipt" ? "paid" : (data.status as string);
  const isDraft    = body.is_draft === true;
  const dueDate    = isoDate((data.meta as { due: string }).due) || null;
  const issueDate  = isoDate((data.meta as { date: string }).date) || null;
  const existingId = uuid(body.id);

  try {
    // Update in place when the client sends the id of a document it owns
    if (existingId) {
      const upd = await db`
        UPDATE invoices
           SET invoice_no = ${invoiceNo}, doc_type = ${docType}, client_name = ${clientName}, total = ${total},
               currency = ${currency}, data = ${JSON.stringify(data)}, status = ${status}, due_date = ${dueDate},
               issue_date = ${issueDate}, is_draft = ${isDraft}, updated_at = NOW()
         WHERE id = ${existingId} AND email_hash = ${p.emailHash}
         RETURNING id
      ` as { id: string }[];
      if (upd.length) return NextResponse.json({ saved: true, id: upd[0].id, updated: true, plan }, { headers: NO_CACHE });
      // not found → fall through and insert as new
    }

    // Enforce the plan's saved-document limit (oldest is replaced).
    if (Number.isFinite(limits.savedDocuments)) {
      const countRows = await db`
        SELECT COUNT(*)::int AS count FROM invoices WHERE email_hash = ${p.emailHash}
      ` as { count: number }[];
      const count = countRows[0]?.count ?? 0;
      const excess = count - limits.savedDocuments + 1;
      if (excess > 0) {
        await db`
          DELETE FROM invoices
           WHERE id IN (
             SELECT id FROM invoices
              WHERE email_hash = ${p.emailHash}
              ORDER BY created_at ASC
              LIMIT ${excess}
           )
        `;
      }
    }

    const rows = await db`
      INSERT INTO invoices (email_hash, invoice_no, doc_type, client_name, total, currency, data, status, due_date, issue_date, is_draft)
      VALUES (${p.emailHash}, ${invoiceNo}, ${docType}, ${clientName}, ${total}, ${currency}, ${JSON.stringify(data)}, ${status}, ${dueDate}, ${issueDate}, ${isDraft})
      RETURNING id
    ` as { id: string }[];

    return NextResponse.json({ saved: true, id: rows[0]?.id, plan }, { headers: NO_CACHE });
  } catch (e) {
    console.error("[invoices/POST]", e);
    return NextResponse.json({ saved: false, reason: "db_error" }, { status: 500, headers: NO_CACHE });
  }
}

/* ─── PATCH — update status ─────────────────────── */
export async function PATCH(req: NextRequest) {
  const a = await authed(req);
  if ("error" in a) return a.error;
  const { p } = a;

  let body: { id?: unknown; status?: unknown };
  try { body = await readJson(req, 4 * 1024); }
  catch { return NextResponse.json({ error: "Invalid body" }, { status: 400, headers: NO_CACHE }); }

  const id = uuid(body.id);
  const status = oneOf(body.status, ["paid", "unpaid"] as const, "unpaid");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400, headers: NO_CACHE });
  if (!isDbReady()) return NextResponse.json({ ok: false, reason: "db_not_configured" }, { headers: NO_CACHE });

  try {
    const db = getDb()!;
    const rows = await db`
      UPDATE invoices
         SET status = ${status},
             data = jsonb_set(COALESCE(data, '{}'::jsonb), '{status}', to_jsonb(${status}::text), true),
             updated_at = NOW()
       WHERE id = ${id} AND email_hash = ${p.emailHash}
       RETURNING id
    ` as { id: string }[];
    if (!rows.length) return NextResponse.json({ error: "Not found" }, { status: 404, headers: NO_CACHE });
    return NextResponse.json({ ok: true, id, status }, { headers: NO_CACHE });
  } catch (e) {
    console.error("[invoices/PATCH]", e);
    return NextResponse.json({ error: "Failed to update" }, { status: 500, headers: NO_CACHE });
  }
}

/* ─── DELETE ────────────────────────────────────── */
export async function DELETE(req: NextRequest) {
  const a = await authed(req);
  if ("error" in a) return a.error;
  const { p } = a;

  const id = uuid(req.nextUrl.searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400, headers: NO_CACHE });
  if (!isDbReady()) return NextResponse.json({ ok: false, reason: "db_not_configured" }, { headers: NO_CACHE });

  try {
    const db = getDb()!;
    const rows = await db`
      DELETE FROM invoices WHERE id = ${id} AND email_hash = ${p.emailHash} RETURNING id
    ` as { id: string }[];
    if (!rows.length) return NextResponse.json({ error: "Not found" }, { status: 404, headers: NO_CACHE });
    return NextResponse.json({ ok: true, id }, { headers: NO_CACHE });
  } catch (e) {
    console.error("[invoices/DELETE]", e);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500, headers: NO_CACHE });
  }
}
