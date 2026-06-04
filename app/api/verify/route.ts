import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../activate/route";

/* ─── POST /api/verify ───────────────────────────── */
export async function POST(req: NextRequest) {
  let body: { token?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ valid: false }, { status: 400 });
  }

  const token = typeof body.token === "string" ? body.token : "";
  if (!token) {
    return NextResponse.json({ valid: false });
  }

  return NextResponse.json(
    { valid: verifyToken(token) },
    { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } },
  );
}
