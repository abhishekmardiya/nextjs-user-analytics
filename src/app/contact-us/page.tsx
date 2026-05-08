import Link from "next/link";

const linkClassName =
  "text-sm font-medium text-violet-600 underline-offset-4 hover:underline dark:text-violet-400";

export default function ContactUsPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center gap-4 bg-zinc-100 px-6 py-16 dark:bg-zinc-950">
      <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Contact us
      </h1>

      <Link href="/" className={linkClassName}>
        Back to home
      </Link>
    </div>
  );
}
