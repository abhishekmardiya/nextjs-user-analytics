const ANALYTICS_EVENTS_PATH = "/api/analytics/events";

// Flush when tab is hidden/closed or when the threshold of events is reached

// Our main approach is to store as many events as possible in in-memory storage and flush them when the user closes the tab or switches tabs. However, since `sendBeacon` has a payload limit of 64 KB, we also need to flush events once a certain threshold is reached. This ensures that even if the user does not change or close the tab, the accumulated events do not exceed the maximum payload size.
export const ANALYTICS_BATCH_FLUSH_EVENT_THRESHOLD = 20;

function formatISTTimeHmms(now: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(now);
}

type QueuedAnalyticsEvent = {
  type: string;
  metadata: Record<string, unknown>;
  time: string;
};

const queue: QueuedAnalyticsEvent[] = [];

export const enqueueAnalyticsEvent = ({
  type,
  metadata,
}: {
  type: string;
  metadata: Record<string, unknown>;
}) => {
  queue.push({
    type,
    metadata,
    time: new Date().toISOString(),
  });

  if (queue.length >= ANALYTICS_BATCH_FLUSH_EVENT_THRESHOLD) {
    flushAnalyticsEvents();
  }
};

export const flushAnalyticsEvents = () => {
  if (!queue.length) {
    return;
  }

  // Remove all events from the queue and store them in 'events'
  // splice(0, queue.length) extracts all elements from the queue array,
  // clearing the queue and returning the removed elements as a new array called 'events'
  const events = queue.splice(0, queue.length);
  const payload = JSON.stringify({
    generateAt: formatISTTimeHmms(new Date()),
    events,
  });

  // `Blob` is used with `sendBeacon()` to set the correct `Content-Type`. Without it, the browser usually sends the payload as `text/plain`, while with `Blob` it sends it as `application/json`.
  navigator.sendBeacon(
    ANALYTICS_EVENTS_PATH,
    new Blob([payload], {
      type: "application/json",
    })
  );
};
