import { NextRequest, NextResponse } from "next/server";
import { searchAll } from "@/lib/search";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();
  const orientation = req.nextUrl.searchParams.get("orientation") || "all";

  if (!q) return NextResponse.json({ error: "q is required" }, { status: 400 });

  try {
    const data = await searchAll(q, orientation);
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
