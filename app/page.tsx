"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Transition } from "framer-motion";
import { ArrowRight, Code2, Layers, Sparkles } from "lucide-react";

const ease = "easeOut" as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease } as Transition,
});

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, delay, ease } as Transition,
});

const techStack = ["React", "Next.js", "TypeScript", "Node.js", "Tailwind", "MongoDB"];

const stats = [
  { value: "2+", label: "Years Exp." },
  { value: "20+", label: "Projects Built" },
  { value: "100%", label: "Satisfaction" },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      {/* Hero Section */}
      <section
        id="hero"
        className="w-full min-h-screen flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
      >
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left Column ── */}
          <div className="flex flex-col items-start">
            {/* Badge */}
            <motion.div
              {...fadeUp(0)}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-8 border border-emerald-200 dark:border-emerald-400/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 dark:bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 dark:bg-emerald-400" />
              </span>
              Available for Work
            </motion.div>

            {/* Heading */}
            <motion.h1
              {...fadeUp(0.1)}
              className="text-5xl md:text-6xl font-bold tracking-tight mb-5 leading-tight text-slate-900 dark:text-white"
            >
              Crafting{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Digital
              </span>{" "}
              <br />
              Experiences
              <br />
              <span className="text-slate-500 dark:text-white/50">That Matter</span>
            </motion.h1>

            {/* Sub-heading */}
            <motion.p
              {...fadeUp(0.2)}
              className="text-base md:text-lg text-slate-600 dark:text-white/60 mb-8 max-w-xl leading-relaxed"
            >
              Hi, I&apos;m <span className="text-slate-900 dark:text-white font-semibold">Prakash Singh</span> — a
              Full Stack Developer passionate about building fast, accessible, and beautiful web applications.
            </motion.p>

            {/* Tech Pills */}
            <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-2 mb-9">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/60 border border-slate-200 dark:border-white/10"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div {...fadeUp(0.4)} className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-500 dark:bg-emerald-400 text-white dark:text-[#0b0416] font-semibold rounded-full hover:bg-emerald-600 dark:hover:bg-emerald-300 transition-all duration-200 shadow-lg shadow-emerald-500/25"
              >
                View My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white font-medium rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-all duration-200 border border-slate-300 dark:border-white/10"
              >
                Get in Touch
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div {...fadeUp(0.5)} className="flex items-center gap-4">
              {([
                {
                  href: "https://github.com",
                  label: "GitHub",
                  path: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z",
                },
                {
                  href: "https://linkedin.com",
                  label: "LinkedIn",
                  path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                },
                {
                  href: "https://twitter.com",
                  label: "X",
                  path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.735-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                },
              ] as { href: string; label: string; path: string }[]).map(({ href, label, path }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/60 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all border border-slate-200 dark:border-white/10"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d={path} /></svg>
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Right Column – Profile Image ── */}
          <div className="flex flex-col items-center gap-8">
            {/* Image Card */}
            <motion.div {...fadeLeft(0.15)} className="relative w-full max-w-sm">
              {/* Decorative blobs */}
              <div className="absolute -top-6 -left-6 w-40 h-40 rounded-full bg-emerald-400/20 blur-3xl" />
              <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-full bg-cyan-400/20 blur-3xl" />

              {/* Card border glow */}
              <motion.div
                animate={{ boxShadow: ["0 0 20px rgba(52,211,153,0.15)", "0 0 50px rgba(52,211,153,0.35)", "0 0 20px rgba(52,211,153,0.15)"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5"
              >
                <Image
                  src="/hero-profile.png"
                  alt="Prakash Singh – Full Stack Developer"
                  width={480}
                  height={520}
                  className="w-full h-auto object-cover"
                  priority
                />

                {/* Floating badge – top right */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/90 dark:bg-[#0b0416]/80 backdrop-blur-sm border border-slate-200 dark:border-white/10 shadow-lg"
                >
                  <Code2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-white">Full Stack Dev</span>
                </motion.div>

                {/* Floating badge – bottom left */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/90 dark:bg-[#0b0416]/80 backdrop-blur-sm border border-slate-200 dark:border-white/10 shadow-lg"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-white">Open to Opportunities</span>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Stats Row */}
            <motion.div {...fadeLeft(0.35)} className="grid grid-cols-3 gap-4 w-full max-w-sm">
              {stats.map(({ value, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                >
                  <span className="text-2xl font-bold bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    {value}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-white/50 mt-1 text-center">{label}</span>
                </div>
              ))}
            </motion.div>

            {/* Services mini row */}
            <motion.div {...fadeLeft(0.5)} className="flex gap-3 w-full max-w-sm">
              {[
                { icon: Code2, label: "Web Dev" },
                { icon: Layers, label: "UI/UX" },
                { icon: Sparkles, label: "APIs" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex-1 flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-emerald-400/40 transition-colors cursor-default"
                >
                  <Icon className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs text-slate-600 dark:text-white/60">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}