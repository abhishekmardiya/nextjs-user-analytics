import Link from "next/link";

export default function AboutUsPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center gap-4 bg-zinc-100 px-6 py-16 dark:bg-zinc-950">
      <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        About us
      </h1>

      <Link
        href="/"
        prefetch={false}
        className="text-sm font-medium text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
      >
        Back to home
      </Link>
    </div>
  );
}
