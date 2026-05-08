import Image from "next/image";

import { RealEstateTrackingDemo } from "@/components/RealEstateTrackingDemo";
import { ANALYTICS_BATCH_FLUSH_EVENT_THRESHOLD } from "@/lib/analyticsBatch";

const trackingNoteCodeClass =
  "rounded-md bg-zinc-200/80 px-1.5 py-0.5 font-mono text-[0.6875rem] text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200";

export default function Home() {
  return (
    <div className="relative flex min-h-full flex-1 overflow-hidden bg-zinc-100 font-sans dark:bg-zinc-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-40 top-0 h-112 w-md rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-600/20" />
        <div className="absolute -right-40 bottom-0 h-112 w-md rounded-full bg-cyan-400/15 blur-3xl dark:bg-cyan-600/15" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-2xl dark:bg-zinc-800/30" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center justify-center gap-14 px-6 py-16 sm:max-w-xl sm:px-8 sm:py-24">
        <div className="flex flex-col items-center gap-8 text-center">
          <Image
            src="/next.svg"
            alt="Next.js"
            width={120}
            height={24}
            priority
            className="dark:invert opacity-90"
          />
          <div className="space-y-3">
            <h1 className="text-balance text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
              Batched user-action tracking
            </h1>
            <p className="text-pretty text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Events are queued and sent together after{" "}
              {ANALYTICS_BATCH_FLUSH_EVENT_THRESHOLD} events, or when user hides
              this tab or leave the page. Check the terminal for{" "}
              <code className="rounded-md bg-zinc-200/80 px-1.5 py-0.5 text-xs font-mono text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                [analytics/events]
              </code>
              .
            </p>

            <h2 className="mt-12 text-2xl font-semibold text-zinc-700 dark:text-zinc-300">
              What we track
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              The app tracks page time and click events: active seconds per
              route are recorded as{" "}
              <code className={trackingNoteCodeClass}>page_time</code>, and the
              demo controls send listing clicks (
              <code className={trackingNoteCodeClass}>map_click</code>,{" "}
              <code className={trackingNoteCodeClass}>contact_click</code>,{" "}
              <code className={trackingNoteCodeClass}>brochure_download</code>).
              <br />
              Everything uses the same batch pipeline below.
            </p>
          </div>
        </div>

        <RealEstateTrackingDemo />
      </main>
    </div>
  );
}
