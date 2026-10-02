import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    region: "eu-central-2 (Zurich)",
    compliance: "Swiss nDSG & FINMA Ready",
    timestamp: Date.now(),
  });
}
