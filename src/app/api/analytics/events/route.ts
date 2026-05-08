import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  console.info("[analytics/events]", JSON.stringify(body, null, 2));

  return new NextResponse(null, { status: 204 });
}
