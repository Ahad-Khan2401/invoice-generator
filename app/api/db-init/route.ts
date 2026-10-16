/**
 * POST /api/db-init   (header: x-init-secret: <DB_INIT_SECRET>)
 *
 * Idempotent schema migration for Neon — applies every statement in
 * lib/db.ts SCHEMA_STATEMENTS (CREATE IF NOT EXISTS / ADD COLUMN IF NOT
 * EXISTS only, never drops data). Safe to call after every deploy.
 *
 * GET with ?secret= is still accepted for backwards compatibility but the
 * header form is preferred (query strings end up in logs).
 */
import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { getDb, isDbReady, SCHEMA_STATEMENTS } from "@/lib/db";
import { rateLimit, clientIp, tooMany } from "@/lib/rate-limit";

function authorised(req: NextRequest): NextResponse | null {
  const secret = process.env.DB_INIT_SECRET;
  if (!secret) return NextResponse.json({ error: "DB_INIT_SECRET env var not set" }, { status: 500 });
  const provided = req.headers.get("x-init-secret") ?? req.nextUrl.searchParams.get("secret") ?? "";
  const a = Buffer.from(provided); const b = Buffer.from(secret);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return null;
}

async function run(req: NextRequest) {
  const rl = rateLimit(`db-init:${clientIp(req)}`, 5, 60_000);
  if (!rl.ok) return tooMany(rl);
  const denied = authorised(req);
  if (denied) return denied;
  if (!isDbReady()) return NextResponse.json({ error: "DATABASE_URL not configured" }, { status: 500 });

  const db = getDb()!;
  const applied: string[] = [];
  try {
    for (const stmt of SCHEMA_STATEMENTS) {
      await db.query(stmt);
      applied.push(stmt.trim().split(/\s+/).slice(0, 6).join(" "));
    }
    return NextResponse.json({ ok: true, applied: applied.length, statements: applied });
  } catch (e) {
    console.error("[db-init]", e);
    return NextResponse.json({ ok: false, error: "Migration failed — see server logs", appliedBeforeFailure: applied.length }, { status: 500 });
  }
}

export async function POST(req: NextRequest) { return run(req); }
export async function GET(req: NextRequest)  { return run(req); }
