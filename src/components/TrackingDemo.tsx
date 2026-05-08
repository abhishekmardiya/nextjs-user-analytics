"use client";

import Link from "next/link";

import { enqueueAnalyticsEvent } from "@/lib/analyticsBatch";

function ExternalLinkIcon({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.75}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5M7.5 16.5 21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  );
}

const demoNavLinkClassName =
  "inline-flex shrink-0 items-center gap-1 py-1.5 text-base font-medium text-blue-600 underline-offset-4 decoration-blue-600/35 hover:underline sm:py-2 sm:text-lg dark:text-blue-400 dark:decoration-blue-400/35";

const demoButtonClassName =
  "inline-flex min-h-8 w-full cursor-pointer items-center justify-center rounded-lg border border-zinc-300 bg-white/90 px-3 py-1 text-xs font-medium text-zinc-800 shadow-sm transition-[background-color,border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-zinc-400 hover:bg-white hover:shadow-md active:translate-y-0 sm:min-h-0 sm:w-auto sm:rounded-full sm:px-4 sm:py-2.5 sm:text-sm dark:border-zinc-600 dark:bg-zinc-800/90 dark:text-zinc-100 dark:hover:border-zinc-500 dark:hover:bg-zinc-800 dark:hover:shadow-zinc-950/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-zinc-500 dark:focus-visible:ring-offset-zinc-900";

export const TrackingDemo = () => {
  const handleClickEvent = (
    type: string,
    metadata: Record<string, unknown>
  ) => {
    enqueueAnalyticsEvent({ type, metadata });
  };

  return (
    <section className="w-full rounded-2xl border border-zinc-200/90 bg-white/75 p-4 shadow-lg shadow-zinc-950/5 ring-1 ring-black/5 backdrop-blur-md dark:border-zinc-700/80 dark:bg-zinc-900/75 dark:shadow-black/30 dark:ring-white/10 sm:p-6">
      <h2 className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-wider text-zinc-500 sm:mb-3 sm:text-xs dark:text-zinc-400">
        Try Page Navigation
      </h2>
      <nav
        aria-label="Demo pages"
        className="flex flex-row flex-nowrap items-center justify-center gap-x-8 sm:gap-x-12"
      >
        <Link
          href="/contact-us"
          prefetch={false}
          className={demoNavLinkClassName}
        >
          Contact us
        </Link>
        <Link
          href="/about-us"
          prefetch={false}
          target="_blank"
          rel="noopener noreferrer"
          className={demoNavLinkClassName}
          title="Opens in a new tab"
        >
          About us
          <ExternalLinkIcon className="size-4 shrink-0 opacity-80" />
          <span className="sr-only">Opens in new tab</span>
        </Link>
      </nav>

      <div className="mt-3 border-t border-zinc-200/90 pt-3 dark:border-zinc-700/80 sm:mt-4 sm:pt-4">
        <h2 className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-wider text-zinc-500 sm:mb-3 sm:text-xs dark:text-zinc-400">
          Try actions
        </h2>

        <div className="grid grid-cols-2 gap-1.5 sm:flex sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3">
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
            className={`${demoButtonClassName} max-sm:col-span-2 max-sm:mx-auto max-sm:w-auto`}
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
