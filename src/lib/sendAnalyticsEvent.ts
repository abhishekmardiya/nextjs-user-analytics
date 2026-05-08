export const sendAnalyticsEvent = ({
  type,
  metadata,
}: {
  type: string;
  metadata: Record<string, unknown>;
}) => {
  navigator.sendBeacon(
    "/api/analytics/events",
    JSON.stringify({
      type,
      metadata,
      time: new Date().toISOString(),
    })
  );
};
