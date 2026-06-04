import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/pro-token";

export async function POST(req: NextRequest) {
  let body: { token?: unknown };
  try { body = await req.json(); }
  catch { return NextResponse.json({ valid: false }, { status: 400 }); }

  const token = typeof body.token === "string" ? body.token : "";
  if (!token) return NextResponse.json({ valid: false });

  const result = verifyToken(token);
  return NextResponse.json(
    { valid: result.valid, isPro: result.isPro },
    { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
  );
}
