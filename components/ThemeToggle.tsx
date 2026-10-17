"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = React.useSyncExternalStore(emptySubscribe, () => true, () => false);

  if (!mounted) {
    return <div className="w-11 h-11" aria-hidden="true" />; // placeholder to prevent layout shift
  }

  const currentTheme = resolvedTheme || theme;

  return (
    <button
      type="button"
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="min-w-[44px] min-h-[44px] p-2.5 flex items-center justify-center rounded-full bg-slate-100 dark:bg-emerald-400/10 border border-slate-200 dark:border-emerald-400/20 text-slate-800 dark:text-emerald-400 hover:bg-slate-200 dark:hover:bg-emerald-400/20 transition-all relative overflow-hidden cursor-pointer"
      aria-label={`Switch to ${currentTheme === "dark" ? "light" : "dark"} mode`}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" aria-hidden="true" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" aria-hidden="true" />
    </button>
  );
}
