"use client";

import { enqueueAnalyticsEvent } from "@/lib/analyticsBatch";

const demoButtonClassName =
  "cursor-pointer rounded-full border border-zinc-300 bg-white/90 px-4 py-2.5 text-sm font-medium text-zinc-800 shadow-sm transition-[background-color,border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-zinc-400 hover:bg-white hover:shadow-md active:translate-y-0 dark:border-zinc-600 dark:bg-zinc-800/90 dark:text-zinc-100 dark:hover:border-zinc-500 dark:hover:bg-zinc-800 dark:hover:shadow-zinc-950/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-zinc-500 dark:focus-visible:ring-offset-zinc-900";

export const RealEstateTrackingDemo = () => {
  const handleClickEvent = (
    type: string,
    metadata: Record<string, unknown>,
  ) => {
    enqueueAnalyticsEvent({ type, metadata });
  };

  return (
    <section className="w-full rounded-2xl border border-zinc-200/90 bg-white/75 p-6 shadow-lg shadow-zinc-950/5 ring-1 ring-black/5 backdrop-blur-md dark:border-zinc-700/80 dark:bg-zinc-900/75 dark:shadow-black/30 dark:ring-white/10 sm:p-8">
      <header className="mb-6 border-b border-zinc-200/80 pb-5 dark:border-zinc-700/80">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Try property actions
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Each control fires a sample event into the same batch pipeline.
        </p>
      </header>

      <div className="flex flex-wrap gap-2.5">
        <button
          type="button"
          className={demoButtonClassName}
          onClick={() => {
            handleClickEvent("map_click", {
              propertyId: "686d166d35a8e3b1abd04a89",
            });
          }}
        >
          Map click
        </button>
        <button
          type="button"
          className={demoButtonClassName}
          onClick={() => {
            handleClickEvent("contact_click", {
              propertyId: "686d166d35a8e3b1abd04a89",
            });
          }}
        >
          Contact
        </button>
        <button
          type="button"
          className={demoButtonClassName}
          onClick={() => {
            handleClickEvent("brochure_download", {
              propertyId: "686d166d35a8e3b1abd04a89",
            });
          }}
        >
          Brochure
        </button>
        <button
          type="button"
          className={demoButtonClassName}
          onClick={() => {
            handleClickEvent("floor_plan_view", {
              propertyId: "686d166d35a8e3b1abd04a89",
            });
          }}
        >
          Floor plans
        </button>
      </div>
    </section>
  );
};
