/**
 * lib/db.ts — Neon PostgreSQL (free, serverless)
 *
 * Uses @neondatabase/serverless — works perfectly on Vercel Edge/Serverless.
 * Returns null gracefully if DATABASE_URL is not yet set.
 *
 * Schema (run once in Neon SQL Editor):
 *   see SCHEMA below — also at /api/db-init if you call it once.
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

export const SCHEMA = `
-- Run this once in Neon SQL Editor ↓

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
);

CREATE INDEX IF NOT EXISTS idx_invoices_email_hash
  ON invoices(email_hash, created_at DESC);
`;
