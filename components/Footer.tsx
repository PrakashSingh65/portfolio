export default function Footer() {
  return (
    <footer className="w-full py-12 border-t border-slate-200 dark:border-white/5 mt-24">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center justify-center gap-6">
        <div className="flex gap-4 sm:gap-6 flex-wrap justify-center">
          <a
            href="https://www.linkedin.com/in/prakash-singh-rajput-a89a15243/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile of Prakash Singh (opens in new tab)"
            className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-3"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/PrakashSingh65"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile of Prakash Singh (opens in new tab)"
            className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-3"
          >
            GitHub
          </a>
          <a
            href="https://x.com/Prakash89795230"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter) profile of Prakash Singh (opens in new tab)"
            className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-3"
          >
            Twitter
          </a>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm text-center">
          © {new Date().getFullYear()} Prakash Singh. All rights reserved.
        </p>
      </div>
    </footer>
  );
}