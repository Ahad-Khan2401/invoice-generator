/**
 * GET  /api/invoices  — list invoices for the authenticated user
 * POST /api/invoices  — save a new invoice
 *
 * Auth: Bearer token in Authorization header (our HMAC token).
 * Free users: returns last 5 invoices.
 * Pro  users: returns all invoices.
 */
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/pro-token";
import { getSupabase } from "@/lib/supabase-server";

const NO_CACHE = { "Cache-Control": "no-store" };
const FREE_LIMIT = 5;

/* ─── Auth helper ─────────────────────────────────── */
function getToken(req: NextRequest) {
  const auth = req.headers.get("authorization") ?? "";
  return auth.startsWith("Bearer ") ? auth.slice(7) : "";
}

/* ─── GET — list invoices ─────────────────────────── */
export async function GET(req: NextRequest) {
  const rawToken = getToken(req);
  if (!rawToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = verifyToken(rawToken);
  if (!payload.valid) return NextResponse.json({ error: "Invalid or expired session" }, { status: 401 });

  const db = getSupabase();
  if (!db) return NextResponse.json({ invoices: [], dbReady: false }, { headers: NO_CACHE });

  const limit = payload.isPro ? 1000 : FREE_LIMIT;

  const { data, error } = await db
    .from("invoices")
    .select("id, invoice_no, doc_type, client_name, total, currency, created_at")
    .eq("email_hash", payload.emailHash)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[invoices/GET]", error);
    return NextResponse.json({ error: "Failed to load invoices" }, { status: 500 });
  }

  return NextResponse.json({ invoices: data ?? [], isPro: payload.isPro, dbReady: true }, { headers: NO_CACHE });
}

/* ─── POST — save invoice ─────────────────────────── */
export async function POST(req: NextRequest) {
  const rawToken = getToken(req);
  if (!rawToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = verifyToken(rawToken);
  if (!payload.valid) return NextResponse.json({ error: "Invalid or expired session" }, { status: 401 });

  let body: {
    invoice_no?: string;
    doc_type?: string;
    client_name?: string;
    total?: number;
    currency?: string;
    data?: object;
  };
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "Invalid body" }, { status: 400 }); }

  const db = getSupabase();
  if (!db) return NextResponse.json({ saved: false, reason: "db_not_configured" });

  // Free users: enforce 5-invoice limit
  if (!payload.isPro) {
    const { count } = await db
      .from("invoices")
      .select("*", { count: "exact", head: true })
      .eq("email_hash", payload.emailHash);

    if ((count ?? 0) >= FREE_LIMIT) {
      // Delete the oldest to make room
      const { data: oldest } = await db
        .from("invoices")
        .select("id")
        .eq("email_hash", payload.emailHash)
        .order("created_at", { ascending: true })
        .limit(1);
      if (oldest?.length) {
        await db.from("invoices").delete().eq("id", oldest[0].id);
      }
    }
  }

  const { data, error } = await db
    .from("invoices")
    .insert({
      email_hash:  payload.emailHash,
      invoice_no:  body.invoice_no  ?? "—",
      doc_type:    body.doc_type    ?? "invoice",
      client_name: body.client_name ?? "—",
      total:       body.total       ?? 0,
      currency:    body.currency    ?? "USD",
      data:        body.data        ?? {},
    })
    .select("id")
    .single();

  if (error) {
    console.error("[invoices/POST]", error);
    return NextResponse.json({ saved: false, reason: "db_error" });
  }

  return NextResponse.json({ saved: true, id: data?.id });
}
