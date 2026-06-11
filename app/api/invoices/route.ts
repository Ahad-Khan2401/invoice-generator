/**
 * GET  /api/invoices  — list invoices for the authenticated user
 * POST /api/invoices  — save a new invoice
 *
 * Auth : Bearer {our HMAC token} in Authorization header
 * Free : last 5 invoices (oldest deleted when full)
 * Pro  : unlimited
 */
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/pro-token";
import { getDb, isDbReady } from "@/lib/db";

const NO_CACHE   = { "Cache-Control": "no-store" };
const FREE_LIMIT = 5;

/* ─── Auth ──────────────────────────────────────── */
function bearerToken(req: NextRequest): string {
  const h = req.headers.get("authorization") ?? "";
  return h.startsWith("Bearer ") ? h.slice(7) : "";
}

/* ─── GET — list invoices ───────────────────────── */
export async function GET(req: NextRequest) {
  const rawToken = bearerToken(req);
  if (!rawToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const p = verifyToken(rawToken);
  if (!p.valid) return NextResponse.json({ error: "Invalid or expired session" }, { status: 401 });

  if (!isDbReady()) {
    return NextResponse.json({ invoices: [], dbReady: false }, { headers: NO_CACHE });
  }

  const db    = getDb()!;
  const limit = p.isPro ? 1000 : FREE_LIMIT;

  // ?id=<uuid> → return that single invoice WITH its full form data
  // (used by the generator's /?load=<id> re-edit flow from the dashboard)
  const id = req.nextUrl.searchParams.get("id");
  if (id) {
    try {
      const rows = await db`
        SELECT id, invoice_no, doc_type, data
          FROM invoices
         WHERE id = ${id} AND email_hash = ${p.emailHash}
         LIMIT 1
      ` as { id: string; invoice_no: string; doc_type: string; data: unknown }[];
      if (!rows.length) {
        return NextResponse.json({ error: "Not found" }, { status: 404, headers: NO_CACHE });
      }
      return NextResponse.json({ invoice: rows[0] }, { headers: NO_CACHE });
    } catch (e) {
      console.error("[invoices/GET?id]", e);
      return NextResponse.json({ error: "Failed to load invoice" }, { status: 500 });
    }
  }

  try {
    const rows = await db`
      SELECT id, invoice_no, doc_type, client_name, total, currency, created_at
        FROM invoices
       WHERE email_hash = ${p.emailHash}
       ORDER BY created_at DESC
       LIMIT ${limit}
    `;
    return NextResponse.json(
      { invoices: rows, isPro: p.isPro, dbReady: true },
      { headers: NO_CACHE }
    );
  } catch (e) {
    console.error("[invoices/GET]", e);
    return NextResponse.json({ error: "Failed to load invoices" }, { status: 500 });
  }
}

/* ─── POST — save invoice ───────────────────────── */
export async function POST(req: NextRequest) {
  const rawToken = bearerToken(req);
  if (!rawToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const p = verifyToken(rawToken);
  if (!p.valid) return NextResponse.json({ error: "Invalid or expired session" }, { status: 401 });

  let body: {
    invoice_no?:  string;
    doc_type?:    string;
    client_name?: string;
    total?:       number;
    currency?:    string;
    data?:        object;
  };
  try   { body = await req.json(); }
  catch { return NextResponse.json({ error: "Invalid body" }, { status: 400 }); }

  if (!isDbReady()) {
    return NextResponse.json({ saved: false, reason: "db_not_configured" });
  }

  const db = getDb()!;

  try {
    // Free users: keep only the latest FREE_LIMIT invoices (delete oldest first)
    if (!p.isPro) {
      const countRows = await db`
        SELECT COUNT(*)::int AS count FROM invoices WHERE email_hash = ${p.emailHash}
      ` as { count: number }[];

      const count = countRows[0]?.count ?? 0;
      if (count >= FREE_LIMIT) {
        await db`
          DELETE FROM invoices
           WHERE id = (
             SELECT id FROM invoices
              WHERE email_hash = ${p.emailHash}
              ORDER BY created_at ASC
              LIMIT 1
           )
        `;
      }
    }

    const invoiceNo  = body.invoice_no  ?? "—";
    const docType    = body.doc_type    ?? "invoice";
    const clientName = body.client_name ?? "—";
    const total      = body.total       ?? 0;
    const currency   = body.currency    ?? "USD";
    const data       = JSON.stringify(body.data ?? {});

    const rows = await db`
      INSERT INTO invoices (email_hash, invoice_no, doc_type, client_name, total, currency, data)
      VALUES (${p.emailHash}, ${invoiceNo}, ${docType}, ${clientName}, ${total}, ${currency}, ${data})
      RETURNING id
    ` as { id: string }[];

    return NextResponse.json({ saved: true, id: rows[0]?.id });
  } catch (e) {
    console.error("[invoices/POST]", e);
    return NextResponse.json({ saved: false, reason: "db_error" });
  }
}
