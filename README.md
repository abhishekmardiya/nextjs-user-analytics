# User analytics

Client-side tracking in this app uses an **in-memory queue**. Events accumulate until they are flushed in one request.

## What we track

- Click events
- Time spent on pages

## How batches are sent

Events are POSTed as JSON via **`navigator.sendBeacon`** (`/api/analytics/events`). The queue is flushed when:

- The **tab is hidden** (`visibilitychange`) or the page is **leaving** (`beforeunload`), or when the batch transport **unmounts**
- The queue reaches the **event threshold** (currently `ANALYTICS_BATCH_FLUSH_EVENT_THRESHOLD` in `src/lib/analyticsBatch.ts`)

`sendBeacon` payloads are capped (on the order of **64 KB** per browser). Batching avoids losing data on unload while the threshold avoids growing a single payload past that limit if the user stays on one tab for a long time.
