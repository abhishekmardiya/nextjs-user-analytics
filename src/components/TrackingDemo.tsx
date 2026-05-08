"use client";

import Link from "next/link";

import { enqueueAnalyticsEvent } from "@/lib/analyticsBatch";

const demoNavLinkClassName =
  "text-lg font-medium text-blue-600 underline-offset-4 hover:underline dark:text-blue-400";

const demoButtonClassName =
  "cursor-pointer rounded-full border border-zinc-300 bg-white/90 px-4 py-2.5 text-sm font-medium text-zinc-800 shadow-sm transition-[background-color,border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-zinc-400 hover:bg-white hover:shadow-md active:translate-y-0 dark:border-zinc-600 dark:bg-zinc-800/90 dark:text-zinc-100 dark:hover:border-zinc-500 dark:hover:bg-zinc-800 dark:hover:shadow-zinc-950/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-zinc-500 dark:focus-visible:ring-offset-zinc-900";

export const TrackingDemo = () => {
  const handleClickEvent = (
    type: string,
    metadata: Record<string, unknown>
  ) => {
    enqueueAnalyticsEvent({ type, metadata });
  };

  return (
    <section className="w-full rounded-2xl border border-zinc-200/90 bg-white/75 p-8 shadow-lg shadow-zinc-950/5 ring-1 ring-black/5 backdrop-blur-md dark:border-zinc-700/80 dark:bg-zinc-900/75 dark:shadow-black/30 dark:ring-white/10 sm:p-10">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        Try Page Navigation
      </h2>
      <nav
        aria-label="Demo pages"
        className="flex flex-wrap items-center gap-x-10 gap-y-3 sm:gap-x-12"
      >
        <Link href="/" prefetch={false} className={demoNavLinkClassName}>
          Home
        </Link>
        <Link
          href="/about-us"
          prefetch={false}
          target="_blank"
          className={demoNavLinkClassName}
        >
          About us
        </Link>
        <Link
          href="/contact-us"
          prefetch={false}
          target="_blank"
          className={demoNavLinkClassName}
        >
          Contact us
        </Link>
      </nav>

      <div className="mt-6 border-t border-zinc-200/90 pt-6 dark:border-zinc-700/80">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Try actions
        </h2>

        <div className="flex flex-wrap gap-3">
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
        </div>
      </div>
    </section>
  );
};
