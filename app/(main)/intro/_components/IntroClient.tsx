"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code2, Sparkles } from "lucide-react";

const defaultTechStack = ["React", "Next.js", "TypeScript", "Node.js", "Tailwind", "MongoDB"];

// Custom lightweight typewriter component that starts with initial text pre-rendered
function Typewriter({ words, speed = 150, delay = 2000 }: { words: string[], speed?: number, delay?: number }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(words[0]?.length || 0);
  const [reverse, setReverse] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Delay animation until after initial page load and hydration is idle
    const initialDelay = setTimeout(() => {
      setReverse(true);
      setHasStarted(true);
    }, delay);
    return () => clearTimeout(initialDelay);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted || words.length === 0) return;

    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), delay);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      const timeout = setTimeout(() => {
        setReverse(false);
        setIndex((prev) => (prev + 1) % words.length);
      }, 200);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : speed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, speed, delay, hasStarted]);

  return <span>{words[index]?.substring(0, subIndex)}</span>;
}

interface IntroClientProps {
  data: {
    name?: string;
    description?: string;
    techStack?: string[];
    image?: string;
    file?: string;
  } | null;
}

// Transform Cloudinary URL for sub-50ms direct edge delivery with automatic format & compression
function optimizeImageUrl(url?: string): string {
  if (!url) return "/hero-profile.png";
  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    return url.replace("/upload/", "/upload/f_auto,q_auto,w_600/");
  }
  return url;
}

export default function IntroClient({ data }: IntroClientProps) {
  const name = data?.name || "Prakash Singh";
  const description =
    data?.description ||
    "Hi, I'm Prakash Singh — a Full Stack Developer passionate about building fast, accessible, and beautiful web applications.";
  const techStack = data?.techStack && data.techStack.length > 0 ? data.techStack : defaultTechStack;
  const rawImageUrl = data?.image || "/hero-profile.png";
  const imageUrl = optimizeImageUrl(rawImageUrl);
  const resumeUrl = data?.file || "#";
  const isRemote = imageUrl.startsWith("http");

  return (
    <div className="flex min-h-screen flex-col items-center w-full">
      {/* Hero Section - fully visible immediately in SSR HTML for sub-0.5s FCP and LCP */}
      <section
        id="hero"
        aria-label="Introduction and Hero"
        className="w-full min-h-screen flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
      >
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* ── Left Column ── */}
          <div className="flex flex-col items-start">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-400/10 text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-8 border border-emerald-200 dark:border-emerald-400/20">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 dark:bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 dark:bg-emerald-400" />
              </span>
              Available for Work
            </div>

            {/* Heading - Name */}
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 leading-tight text-slate-900 dark:text-white">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">
                {name}
              </span>
            </h1>

            {/* Sub-heading - Tech Stack Typewriter */}
            <div className="text-xl md:text-2xl font-semibold mb-6 text-slate-700 dark:text-white/80 min-h-[40px] flex items-center">
              <span>Specialized in&nbsp;</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold border-r-2 border-emerald-500 dark:border-emerald-400 pr-1.5 animate-pulse">
                <Typewriter words={techStack} />
              </span>
            </div>

            {/* Description */}
            <p className="text-base md:text-lg text-slate-700 dark:text-zinc-300 mb-8 max-w-xl leading-relaxed whitespace-pre-wrap">
              {description}
            </p>

            {/* Tech Pills */}
            <div className="flex flex-wrap gap-2 mb-9">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 dark:bg-emerald-400 text-white dark:text-[#0b0416] font-semibold rounded-full hover:bg-emerald-700 dark:hover:bg-emerald-300 transition-all duration-200 shadow-lg shadow-emerald-500/25 text-sm min-h-[44px]"
              >
                View My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>

              {resumeUrl && resumeUrl !== "#" && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download CV of Prakash Singh (opens in new tab)"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-100 dark:bg-emerald-400/10 text-emerald-700 dark:text-emerald-400 font-semibold rounded-full hover:bg-emerald-200 dark:hover:bg-emerald-400/20 transition-all duration-200 border border-emerald-200 dark:border-emerald-400/20 text-sm shadow-sm min-h-[44px]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download CV
                </a>
              )}

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-white font-medium rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-all duration-200 border border-slate-300 dark:border-white/10 text-sm min-h-[44px]"
              >
                Get in Touch
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {([
                {
                  href: "https://github.com/PrakashSingh65",
                  label: "GitHub profile of Prakash Singh (opens in new tab)",
                  path: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z",
                },
                {
                  href: "https://www.linkedin.com/in/prakash-singh-rajput-a89a15243/",
                  label: "LinkedIn profile of Prakash Singh (opens in new tab)",
                  path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                },
                {
                  href: "https://x.com/Prakash89795230",
                  label: "X (Twitter) profile of Prakash Singh (opens in new tab)",
                  path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.735-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                },
              ] as { href: string; label: string; path: string }[]).map(({ href, label, path }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="min-w-[44px] min-h-[44px] p-2.5 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all border border-slate-200 dark:border-white/10"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true"><path d={path} /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* ── Right Column – Hero Image Card ── */}
          <div className="flex flex-col items-center gap-8">
            <div className="relative w-full max-w-sm group">
              {/* Outer Halo */}
              <div
                className="absolute -inset-1.5 rounded-[2rem] bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-500 opacity-60 blur-xl group-hover:opacity-90 transition duration-700 -z-10"
                aria-hidden="true"
              />

              {/* Card container */}
              <div
                className="relative rounded-3xl overflow-hidden border border-emerald-400/30 dark:border-white/10 bg-slate-100 dark:bg-white/5 aspect-[480/520] p-1.5 bg-gradient-to-br from-emerald-500/20 via-transparent to-cyan-500/20 shadow-[0_0_30px_rgba(52,211,153,0.25)]"
              >
                <div className="relative w-full h-full rounded-[1.25rem] overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={`${name} – Full Stack Developer`}
                    width={480}
                    height={520}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
                    className="w-full h-full object-cover"
                    priority
                    fetchPriority="high"
                    unoptimized={isRemote}
                  />
                </div>

                {/* Floating badge – top right */}
                <div
                  className="absolute top-6 right-6 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/95 dark:bg-[#0b0416]/90 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-lg"
                >
                  <Code2 className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-white">Full Stack Dev</span>
                </div>

                {/* Floating badge – bottom left */}
                <div
                  className="absolute bottom-6 left-6 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/95 dark:bg-[#0b0416]/90 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-lg"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-white">Open to Opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
