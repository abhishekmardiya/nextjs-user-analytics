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

  // Sends batches persisted to localStorage while offline: on the window "online" event and once on mount (see useEffect).
  const handleOnline = () => {
    // Coarse signal: the UA believes there is connectivity (not proof the server is reachable).
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
