"use client";

import { useEffect } from "react";

import { flushAnalyticsEvents } from "@/lib/analyticsBatch";

/**
 * Flushes queued analytics when the batch hits the event threshold (see analyticsBatch)
 * and when the tab is hidden or unloading.
 * Mount after components that enqueue on the same lifecycle (e.g. PageTimeTracking) so their listeners run first inside the same event turn.
 */
export const AnalyticsBatchTransport = () => {
  useEffect(() => {
    const flushOnUnload = () => {
      flushAnalyticsEvents();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        flushAnalyticsEvents();
      }
    };

    // FIXME:implement this
    const handleOffline = () => {
      // console.log("offline");
      // localStorage.setItem("analytics-queue", "test");
    };

    const handleOnline = () => {};

    window.addEventListener("beforeunload", flushOnUnload);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", flushOnUnload);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      flushAnalyticsEvents();
    };
  }, []);

  return null;
};
