"use client";

import { useEffect, useRef } from "react";

import { enqueueAnalyticsEvent } from "@/lib/analyticsBatch";

export const PageTimeTracking = () => {
  const totalTimeRef = useRef(0);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    let wasHidden = document.hidden;
    let segmentOpen = !document.hidden;

    const startTracking = () => {
      startTimeRef.current = Date.now();
      segmentOpen = true;
    };

    const stopTracking = () => {
      const currentSessionTime = Date.now() - startTimeRef.current;

      totalTimeRef.current += currentSessionTime;
    };

    const recordPageTimeAndEnqueue = () => {
      if (!segmentOpen) {
        return;
      }

      segmentOpen = false;
      stopTracking();

      enqueueAnalyticsEvent({
        type: "page_time",
        metadata: {
          totalTimeInSeconds: Math.floor(totalTimeRef.current / 1000),
          pageUrl: window.location.pathname,
        },
      });

      totalTimeRef.current = 0;
    };

    const handleVisibilityChange = () => {
      const { hidden } = document;

      if (hidden && !wasHidden) {
        recordPageTimeAndEnqueue();
      } else if (!hidden && wasHidden) {
        startTracking();
      }

      wasHidden = hidden;
    };

    const handleBeforeUnload = () => {
      if (!document.hidden) {
        recordPageTimeAndEnqueue();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return null;
};
