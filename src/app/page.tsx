import Image from "next/image";

import { TrackingDemo } from "@/components/TrackingDemo";
import { ANALYTICS_BATCH_FLUSH_EVENT_THRESHOLD } from "@/lib/analyticsBatch";

const trackingNoteCodeClass =
  "rounded-md bg-zinc-200/80 px-1.5 py-0.5 font-mono text-[0.6875rem] text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200";

const GITHUB_REPO_URL =
  "https://github.com/abhishekmardiya/nextjs-user-analytics";

function GitHubMark({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      viewBox="0 0 16 16"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="relative flex min-h-svh w-full flex-1 flex-col bg-zinc-100 font-sans dark:bg-zinc-950">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -left-40 top-0 h-112 w-md rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-600/20" />
        <div className="absolute -right-40 bottom-0 h-112 w-md rounded-full bg-cyan-400/15 blur-3xl dark:bg-cyan-600/15" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-2xl dark:bg-zinc-800/30" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center gap-8 px-6 py-10 sm:max-w-xl sm:gap-10 sm:px-8 sm:py-12">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-8">
          <Image
            src="/next.svg"
            alt="Next.js"
            width={120}
            height={24}
            priority
            className="opacity-90 dark:invert"
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

            <h2 className="mt-8 text-2xl font-semibold text-zinc-700 dark:text-zinc-300">
              What we track
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              The app tracks page time and click events: active seconds per
              route are recorded as{" "}
              <code className={trackingNoteCodeClass}>page_time</code>, and the
              demo controls send listing clicks (
              <code className={trackingNoteCodeClass}>map_click</code>,{" "}
              <code className={trackingNoteCodeClass}>contact_click</code>,{" "}
              <code className={trackingNoteCodeClass}>brochure_download</code>
              ).
              <br />
              Everything uses the same batch pipeline below.
            </p>
          </div>
        </div>

        <TrackingDemo />

        <footer className="w-full border-t border-zinc-200/80 pt-6 dark:border-zinc-700/70">
          <div className="flex justify-center">
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View repository on GitHub"
              className="rounded-lg p-2 text-zinc-500 outline-offset-4 transition-colors hover:bg-zinc-200/70 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-4 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
            >
              <GitHubMark className="size-9" />
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
