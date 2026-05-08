"use client";

import { useEffect } from "react";

import {
  ANALYTICS_BATCH_FLUSH_INTERVAL_MS,
  flushAnalyticsEvents,
} from "@/lib/analyticsBatch";

/**
 * Flushes queued analytics on an interval and when the tab is hidden / unloading.
 * Mount after components that enqueue on the same lifecycle (e.g. PageTimeTracking)
 * so their listeners run first inside the same event turn.
 */
export const AnalyticsBatchTransport = () => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      flushAnalyticsEvents();
    }, ANALYTICS_BATCH_FLUSH_INTERVAL_MS);

    const flushOnUnload = () => {
      flushAnalyticsEvents();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        flushAnalyticsEvents();
      }
    };

    window.addEventListener("beforeunload", flushOnUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("beforeunload", flushOnUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      flushAnalyticsEvents();
    };
  }, []);

  return null;
};
