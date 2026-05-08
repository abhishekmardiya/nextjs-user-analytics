import { NextResponse } from "next/server";

function isQueuedShape(value: unknown) {
  if (value === null || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    typeof record.type === "string" &&
    typeof record.time === "string" &&
    record.metadata !== null &&
    typeof record.metadata === "object" &&
    !Array.isArray(record.metadata)
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!Array.isArray(body)) {
    return NextResponse.json(
      { error: "Expected JSON array of events" },
      { status: 400 },
    );
  }

  if (!body.every(isQueuedShape)) {
    return NextResponse.json(
      { error: "Invalid event payloads" },
      { status: 400 },
    );
  }

  console.info("[analytics/events]", JSON.stringify(body, null, 2));

  return new NextResponse(null, { status: 204 });
}
