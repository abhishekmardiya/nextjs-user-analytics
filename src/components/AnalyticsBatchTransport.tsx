"use client";

import { useEffect } from "react";

import { flushAnalyticsEvents } from "@/lib/analyticsBatch";

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
