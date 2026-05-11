"use client";

import { useEffect } from "react";

import {
  ANALYTICS_QUEUE_LOCAL_STORAGE_KEY,
  flushAnalyticsEvents,
  getQueuedAnalyticsEvents,
  sendAnalyticsEventsBeacon,
} from "@/lib/analyticsBatch";

export const AnalyticsBatchTransport = () => {
  const flushOnUnload = () => {
    flushAnalyticsEvents();
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      flushAnalyticsEvents();
    }
  };

  const handleOffline = () => {
    const events = getQueuedAnalyticsEvents();
    if (!events.length) {
      return;
    }

    localStorage.setItem(
      ANALYTICS_QUEUE_LOCAL_STORAGE_KEY,
      JSON.stringify(events)
    );
  };

  const handleOnline = () => {
    // Browser-level: true when the UA thinks there is network connectivity (not a guarantee the host is reachable).
    if (!navigator.onLine) {
      return;
    }

    const events = localStorage.getItem(ANALYTICS_QUEUE_LOCAL_STORAGE_KEY);
    const parsedEvents = events ? JSON.parse(events) : [];

    if (!parsedEvents.length) {
      return;
    }

    localStorage.removeItem(ANALYTICS_QUEUE_LOCAL_STORAGE_KEY);
    sendAnalyticsEventsBeacon(parsedEvents);
  };

  useEffect(() => {
    handleOnline();

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
