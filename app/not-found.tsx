import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl font-bold text-emerald-600 dark:text-emerald-400 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Page Not Found</h2>
      <p className="text-slate-700 dark:text-zinc-300 max-w-md mb-8">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" aria-label="Return to portfolio home page">
        <Button className="min-h-[44px] px-6 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white">
          Return Home
        </Button>
      </Link>
    </div>
  );
}