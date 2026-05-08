# User analytics

Client-side tracking in this app uses an **in-memory queue**. Events accumulate until they are flushed in one request.

## What we track

The app tracks page time and click events.

- **Page time** — seconds on each route when the tab is hidden or the user leaves
- **Clicks** — sample actions (e.g. map, contact, brochure) from the demo controls

## How batches are sent

Events are POSTed as JSON via `navigator.sendBeacon` (`/api/analytics/events`). The queue is flushed when:

- The **tab is hidden** (`visibilitychange`) or the page is **leaving** (`beforeunload`), or when the batch transport **unmounts**
- The queue reaches the **event threshold** (currently `ANALYTICS_BATCH_FLUSH_EVENT_THRESHOLD` in `src/lib/analyticsBatch.ts`)

`sendBeacon` payloads are capped (on the order of **64 KB** per browser). Batching avoids losing data on unload while the threshold avoids growing a single payload past that limit if the user stays on one tab for a long time.

## Slack webhook (third-party APIs)

This project uses a Slack Incoming Webhook as an example so you can see a real third‑party endpoint wired up end‑to‑end. The same pattern applies to other HTTP APIs.

You do not have to use a Next.js Route Handler. Nothing here requires it: you could point `navigator.sendBeacon` straight at many third‑party URLs from the browser and skip `/api/analytics/events` entirely. Reasons this repo keeps `/api/analytics/events` anyway:

1. Local development — the handler logs batches with `console.info` (look for `[analytics/events]` in the dev terminal).
2. Secrets — webhook URLs stay in `process.env` on the server instead of shipping with client JavaScript or fighting CORS (many providers, Slack included, are not reliable as browser‑side webhook targets).

Local setup:

1. Create a Slack [Incoming Webhook](https://api.slack.com/messaging/webhooks) and copy the URL.
2. Add `SLACK_WEBHOOK_URL=...` to `.env`.
3. Restart `npm run dev`. When a batch hits `/api/analytics/events`, the route logs the payload and, if configured, forwards a formatted `text` payload to Slack.

## TODO

If the user goes offline, sendBeacon() fails silently and the events are lost because it does not provide retry handling. To avoid this, events can be temporarily stored in localStorage and retried once the user comes back online
