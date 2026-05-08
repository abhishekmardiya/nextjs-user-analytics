"use client";

import { useEffect, useRef } from "react";

import { sendAnalyticsEvent } from "@/lib/sendAnalyticsEvent";

// accumulates milliseconds only while the tab is visible, sends that total when the tab goes hidden or the user leaves, and resets only the per-segment start time when they return—so repeated hide/show visits add up correctly in totalTimeRef.

export const PageTimeTracking = () => {
  const totalTimeRef = useRef(0);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const startTracking = () => {
      startTimeRef.current = Date.now();
    };

    const stopTracking = () => {
      const currentSessionTime = Date.now() - startTimeRef.current;

      totalTimeRef.current += currentSessionTime;
    };

    const sendAnalytics = () => {
      stopTracking();

      sendAnalyticsEvent({
        type: "page_time",
        metadata: {
          totalTimeInSeconds: Math.floor(totalTimeRef.current / 1000),
          pageUrl: window.location.pathname,
        },
      });
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        sendAnalytics();
      } else {
        startTracking();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    window.addEventListener("beforeunload", sendAnalytics);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      window.removeEventListener("beforeunload", sendAnalytics);
    };
  }, []);

  return null;
};
