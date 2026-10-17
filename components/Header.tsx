import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-[#0b0416]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white"
          aria-label="Prakash Singh Portfolio Home"
        >
          PORT<span className="text-emerald-500 dark:text-emerald-400">FOLIO</span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700 dark:text-white/80 transition-colors"
        >
          <Link href="/projects" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Projects
          </Link>
          <Link href="/blog" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Blog
          </Link>
          <Link href="/certificate" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Certificates
          </Link>
          <Link href="/resume" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Resume
          </Link>
          <Link href="/contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}