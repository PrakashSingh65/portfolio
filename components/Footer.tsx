export default function Footer() {
  return (
    <footer className="w-full py-12 border-t border-slate-200 dark:border-white/5 mt-24">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center justify-center gap-6">
        <div className="flex gap-6">
          <a href="#" className="text-slate-400 dark:text-white/40 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors font-medium">LinkedIn</a>
          <a href="#" className="text-slate-400 dark:text-white/40 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors font-medium">GitHub</a>
          <a href="#" className="text-slate-400 dark:text-white/40 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors font-medium">Twitter</a>
        </div>
        <p className="text-slate-400 dark:text-white/40 text-sm">
          © {new Date().getFullYear()} Prakash Singh All rights reserved.
        </p>
      </div>
    </footer>
  );
}