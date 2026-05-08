import { NextResponse } from "next/server";

function formatISTTimeHmms(now: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).format(now);
}

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

async function postEventsToSlack(events: unknown[]) {
  const url = SLACK_WEBHOOK_URL;
  if (!url || url.trim() === "") {
    return;
  }

  try {
    const istTime = formatISTTimeHmms(new Date());
    const text =
      "IST " +
      istTime +
      "\n```json\n" +
      JSON.stringify(events, null, 2) +
      "\n```";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      console.error(
        "[analytics/events] Slack webhook failed",
        response.status,
        await response.text()
      );
    }
  } catch (error) {
    console.error("[analytics/events] Slack webhook error", error);
  }
}

export async function POST(request: Request) {
  try {
    const events = await request.json();
    console.info("[analytics/events]", JSON.stringify(events, null, 2));

    if (SLACK_WEBHOOK_URL) {
      await postEventsToSlack(events);
    }
  } catch (error: unknown) {
    console.error("[analytics/events] Error", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }

  return new NextResponse("OK", { status: 201 });
}
