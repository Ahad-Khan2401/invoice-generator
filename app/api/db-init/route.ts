/**
 * GET /api/db-init?secret=YOUR_INIT_SECRET
 *
 * One-time endpoint to create the Neon database tables.
 * Protected by DB_INIT_SECRET env var.
 * Call once after setting up Neon, then ignore this route.
 */
import { NextRequest, NextResponse } from "next/server";
import { getDb, isDbReady } from "@/lib/db";

export async function GET(req: NextRequest) {
  const secret = process.env.DB_INIT_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "DB_INIT_SECRET env var not set" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  if (searchParams.get("secret") !== secret) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (!isDbReady()) {
    return NextResponse.json({ error: "DATABASE_URL not configured" }, { status: 500 });
  }

  const db = getDb()!;

  try {
    await db`
      CREATE TABLE IF NOT EXISTS invoices (
        id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        email_hash   TEXT NOT NULL,
        invoice_no   TEXT DEFAULT '—',
        doc_type     TEXT DEFAULT 'invoice',
        client_name  TEXT DEFAULT '—',
        total        NUMERIC DEFAULT 0,
        currency     TEXT DEFAULT 'USD',
        data         JSONB DEFAULT '{}',
        created_at   TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await db`
      CREATE INDEX IF NOT EXISTS idx_invoices_email_hash
        ON invoices(email_hash, created_at DESC)
    `;

    return NextResponse.json({ ok: true, message: "✅ Tables created successfully!" });
  } catch (e) {
    console.error("[db-init]", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
