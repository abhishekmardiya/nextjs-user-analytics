const ANALYTICS_EVENTS_PATH = "/api/analytics/events";

// Flush when tab is hidden/closed or when the threshold of events is reached

// Our main approach is to store as many events as possible in in-memory storage and flush them when the user closes the tab or switches tabs. However, since `sendBeacon` has a payload limit of 64 KB, we also need to flush events once a certain threshold is reached. This ensures that even if the user does not change or close the tab, the accumulated events do not exceed the maximum payload size.
export const ANALYTICS_BATCH_FLUSH_EVENT_THRESHOLD = 20;

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

  // FIXME:make this simpler
  const events = queue.splice(0, queue.length);
  const payload = JSON.stringify(events);

  navigator.sendBeacon(
    ANALYTICS_EVENTS_PATH,
    new Blob([payload], {
      type: "application/json",
    })
  );
};
