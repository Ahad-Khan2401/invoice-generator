/**
 * lib/db.ts — Neon PostgreSQL (serverless)
 *
 * Uses @neondatabase/serverless — works on Vercel Serverless/Edge.
 * Returns null gracefully if DATABASE_URL is not yet set, so every
 * feature that needs the DB degrades instead of crashing.
 *
 * Schema is applied by POST /api/db-init (idempotent; CREATE IF NOT EXISTS
 * and ADD COLUMN IF NOT EXISTS only — never drops or rewrites data).
 */
import { neon, NeonQueryFunction } from "@neondatabase/serverless";

let _sql: NeonQueryFunction<false, false> | null = null;

export function getDb(): NeonQueryFunction<false, false> | null {
  if (_sql) return _sql;
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  _sql = neon(url);
  return _sql;
}

/** Returns true if the DB is configured */
export function isDbReady(): boolean {
  return !!process.env.DATABASE_URL;
}

/* Each statement is applied separately by /api/db-init. All are idempotent. */
export const SCHEMA_STATEMENTS: string[] = [
  // ── Saved documents (invoices / receipts / quotations / estimates) ──
  `CREATE TABLE IF NOT EXISTS invoices (
    id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email_hash   TEXT NOT NULL,
    invoice_no   TEXT DEFAULT '—',
    doc_type     TEXT DEFAULT 'invoice',
    client_name  TEXT DEFAULT '—',
    total        NUMERIC DEFAULT 0,
    currency     TEXT DEFAULT 'USD',
    data         JSONB DEFAULT '{}',
    created_at   TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE INDEX IF NOT EXISTS idx_invoices_email_hash ON invoices(email_hash, created_at DESC)`,
  // Added 2026-10: payment tracking + drafts. Non-destructive.
  `ALTER TABLE invoices ADD COLUMN IF NOT EXISTS status     TEXT DEFAULT 'unpaid'`,
  `ALTER TABLE invoices ADD COLUMN IF NOT EXISTS due_date   DATE`,
  `ALTER TABLE invoices ADD COLUMN IF NOT EXISTS issue_date DATE`,
  `ALTER TABLE invoices ADD COLUMN IF NOT EXISTS is_draft   BOOLEAN DEFAULT FALSE`,
  `ALTER TABLE invoices ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW()`,

  // ── Subscriptions (written by the Lemon Squeezy webhook + sign-in sync) ──
  `CREATE TABLE IF NOT EXISTS subscriptions (
    subscription_id  TEXT PRIMARY KEY,
    email_hash       TEXT NOT NULL,
    status           TEXT NOT NULL,
    plan             TEXT NOT NULL DEFAULT 'pro',
    variant_id       TEXT,
    product_id       TEXT,
    customer_id      TEXT,
    order_id         TEXT,
    renews_at        TIMESTAMPTZ,
    ends_at          TIMESTAMPTZ,
    trial_ends_at    TIMESTAMPTZ,
    card_brand       TEXT,
    card_last_four   TEXT,
    update_url       TEXT,
    customer_portal  TEXT,
    source           TEXT NOT NULL DEFAULT 'webhook',
    created_at       TIMESTAMPTZ DEFAULT NOW(),
    updated_at       TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE INDEX IF NOT EXISTS idx_subscriptions_email_hash ON subscriptions(email_hash)`,

  // ── Webhook idempotency log (event id → processed) ──
  `CREATE TABLE IF NOT EXISTS webhook_events (
    event_id     TEXT PRIMARY KEY,
    event_name   TEXT,
    received_at  TIMESTAMPTZ DEFAULT NOW()
  )`,

  // ── Business profiles (sender details reused across documents) ──
  `CREATE TABLE IF NOT EXISTS profiles (
    id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email_hash   TEXT NOT NULL,
    name         TEXT NOT NULL DEFAULT 'My business',
    data         JSONB NOT NULL DEFAULT '{}',
    is_default   BOOLEAN DEFAULT TRUE,
    created_at   TIMESTAMPTZ DEFAULT NOW(),
    updated_at   TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE INDEX IF NOT EXISTS idx_profiles_email_hash ON profiles(email_hash)`,

  // ── Client directory ──
  `CREATE TABLE IF NOT EXISTS clients (
    id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email_hash   TEXT NOT NULL,
    name         TEXT NOT NULL,
    email        TEXT DEFAULT '',
    phone        TEXT DEFAULT '',
    address      TEXT DEFAULT '',
    created_at   TIMESTAMPTZ DEFAULT NOW(),
    updated_at   TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE INDEX IF NOT EXISTS idx_clients_email_hash ON clients(email_hash, name)`,
];

/** Full schema as one script (for pasting into the Neon SQL editor). */
export const SCHEMA = SCHEMA_STATEMENTS.map((s) => s.trim() + ";").join("\n\n");
