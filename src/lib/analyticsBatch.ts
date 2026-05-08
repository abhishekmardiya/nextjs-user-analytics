const ANALYTICS_EVENTS_PATH = "/api/analytics/events";

/** Milliseconds — matches common analytics batch windows (e.g. 10s). */
export const ANALYTICS_BATCH_FLUSH_INTERVAL_MS = 10_000;

export type QueuedAnalyticsEvent = {
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
};

export const flushAnalyticsEvents = () => {
  if (queue.length === 0) {
    return;
  }

  const events = queue.splice(0, queue.length);
  const payload = JSON.stringify(events);

  navigator.sendBeacon(
    ANALYTICS_EVENTS_PATH,
    new Blob([payload], {
      type: "application/json",
    }),
  );
};
