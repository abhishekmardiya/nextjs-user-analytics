# User analytics

A lightweight and scalable analytics tracking system built with Next.js using `navigator.sendBeacon()` for reliable event delivery. Supports event batching, tab close handling, visibility change tracking, payload threshold flushing, **offline `localStorage` backup and replay**, and minimal API calls for efficient real-time analytics collection.

## Note

If you plan to use a similar analytics approach for **real users** (especially in the EU/EEA/UK), make sure you handle **GDPR** and any other applicable privacy rules yourself—e.g. lawful basis, clear information, consent or opt-out where required, data minimization, retention, and agreements with vendors. This repo is a technical demo and does not implement compliance for you.

## What we track

The app tracks page time and click events.

- **Page time** — seconds on each route when the tab is hidden or the user leaves
- **Clicks** — sample actions (e.g. map, contact, brochure) from the demo controls

## How batches are sent

Events are POSTed as JSON via `navigator.sendBeacon` (`/api/analytics/events`). The queue is flushed when:

- The **tab is hidden** (`visibilitychange`) or the page is **leaving** (`beforeunload`), or when the batch transport **unmounts**
- The queue reaches the **event threshold** (currently `ANALYTICS_BATCH_FLUSH_EVENT_THRESHOLD` in `src/lib/analyticsBatch.ts`)

`sendBeacon` payloads are capped (on the order of **64 KB** per browser). Batching avoids losing data on unload while the threshold avoids growing a single payload past that limit if the user stays on one tab for a long time.

## Offline handling

`sendBeacon` does not surface failures or retries. To reduce data loss when connectivity drops, **`AnalyticsBatchTransport`** (`src/components/AnalyticsBatchTransport.tsx`) mirrors the in-memory queue to **`localStorage`** when the window **`offline`** event fires: it serializes a snapshot from **`getQueuedAnalyticsEvents()`** under **`ANALYTICS_QUEUE_LOCAL_STORAGE_KEY`** (`"analytics-queue"` in `src/lib/analyticsBatch.ts`).

On **`online`** (and once on mount), if **`navigator.onLine`** is true, the client reads that key, removes it, and replays the batch with **`sendAnalyticsEventsBeacon()`** — the same JSON batch shape as a normal flush. **`navigator.onLine`** is a coarse signal (the browser’s view of network state), not a guarantee your analytics endpoint is reachable.

## MockAPI (third-party REST)

> NOTE: The MockAPI step is optional for how you inspect data: batches are already printed in the dev terminal (`console.log`, `[analytics/events]`). You only need a custom `MOCKAPI_EVENTS_URL` if you want rows in your own [mockapi.io](https://mockapi.io/) project (the bundled demo URL is just a shortcut).

`POST /api/analytics/events` (see `src/app/api/analytics/events/route.ts`) logs each batch in the terminal, then POSTs JSON to [mockapi.io](https://mockapi.io/) — a hosted mock REST API useful for prototyping and seeing requests without a real backend. You define projects and collections (here a resource like `/events`); payloads show up as created records.

You could point `navigator.sendBeacon` at mockapi.io directly from the browser for some setups, but this repo uses a Next route so you avoid CORS quirks, keep URLs server-side (`MOCKAPI_EVENTS_URL` optional override), and get `console.log` lines tagged `[analytics/events]`.

### Local notes

1. Browse [mockapi.io](https://mockapi.io/), create your own mock project if the bundled demo URL expires or hits limits.
2. Optional: set `MOCKAPI_EVENTS_URL` in `.env` to your resource URL, then restart `npm run dev`.
