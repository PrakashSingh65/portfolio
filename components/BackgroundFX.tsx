"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

// Precomputed static stars with deterministic positions so there is 0 hydration mismatch and 0 CPU loop
const STATIC_STARS = [
  { top: "6%", left: "12%", size: 1.5, dur: "3.2s", delay: "0s" },
  { top: "9%", left: "46%", size: 2, dur: "4.1s", delay: "0.5s" },
  { top: "13%", left: "78%", size: 1.2, dur: "2.8s", delay: "1.2s" },
  { top: "16%", left: "28%", size: 2.2, dur: "5.0s", delay: "0.8s" },
  { top: "19%", left: "92%", size: 1.2, dur: "3.5s", delay: "2.1s" },
  { top: "25%", left: "62%", size: 1.8, dur: "4.4s", delay: "1.5s" },
  { top: "30%", left: "15%", size: 2.2, dur: "3.9s", delay: "0.3s" },
  { top: "34%", left: "84%", size: 1.5, dur: "4.7s", delay: "1.8s" },
  { top: "39%", left: "38%", size: 1.2, dur: "3.1s", delay: "2.4s" },
  { top: "43%", left: "6%", size: 2, dur: "5.2s", delay: "0.7s" },
  { top: "48%", left: "72%", size: 1.6, dur: "3.6s", delay: "1.1s" },
  { top: "54%", left: "22%", size: 1.8, dur: "4.2s", delay: "2.0s" },
  { top: "59%", left: "95%", size: 1.4, dur: "3.8s", delay: "0.4s" },
  { top: "65%", left: "48%", size: 2.2, dur: "4.9s", delay: "1.6s" },
  { top: "70%", left: "80%", size: 1.2, dur: "3.3s", delay: "2.2s" },
  { top: "75%", left: "18%", size: 2, dur: "4.5s", delay: "0.9s" },
  { top: "80%", left: "65%", size: 1.5, dur: "3.7s", delay: "1.3s" },
  { top: "86%", left: "32%", size: 2.4, dur: "5.1s", delay: "0.2s" },
  { top: "90%", left: "88%", size: 1.3, dur: "4.0s", delay: "1.9s" },
  { top: "95%", left: "55%", size: 1.7, dur: "3.4s", delay: "2.5s" },
];

const SHOOTING_STARS = [
  { top: "12%", left: "80%", dur: "3.8s", delay: "1.5s" },
  { top: "28%", left: "92%", dur: "4.2s", delay: "4.5s" },
  { top: "48%", left: "85%", dur: "4.5s", delay: "7.5s" },
];

const PARTICLES = [
  { top: "22%", left: "12%", size: 3, dur: "6s", delay: "0s" },
  { top: "42%", left: "86%", size: 4, dur: "8s", delay: "2s" },
  { top: "66%", left: "26%", size: 3.5, dur: "7s", delay: "1s" },
  { top: "82%", left: "72%", size: 3, dur: "9s", delay: "3s" },
];

function BackgroundFXContent() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none" aria-hidden="true">
      {/* ── Layer 1 · Light-mode soft gradient mesh ──────────────────── */}
      <div className="absolute inset-0 block dark:hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-emerald-50/40 to-cyan-50/30" />

        {/* Drifting colour orbs */}
        <div
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full animate-orb-slow blur-3xl opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(52,211,153,0.18) 0%, rgba(6,182,212,0.10) 50%, transparent 80%)",
            willChange: "transform",
          }}
        />
        <div
          className="absolute top-1/3 -right-40 w-[450px] h-[450px] rounded-full animate-orb-reverse blur-3xl opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(52,211,153,0.08) 50%, transparent 80%)",
            willChange: "transform",
          }}
        />
        <div
          className="absolute -bottom-40 left-1/3 w-[400px] h-[400px] rounded-full animate-orb-slow blur-3xl opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(167,243,208,0.20) 0%, rgba(103,232,249,0.10) 50%, transparent 80%)",
            willChange: "transform",
          }}
        />

        {/* Subtle dot-grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(circle, #0f766e 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Light floating particles */}
        {PARTICLES.map((p, i) => (
          <div
            key={`lp-${i}`}
            className="absolute rounded-full bg-emerald-400 animate-float-slow"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: 0.35,
              animationDuration: p.dur,
              animationDelay: p.delay,
              willChange: "transform",
            }}
          />
        ))}
      </div>

      {/* ── Layer 2 · Dark-mode starfield + aurora ────────────────────── */}
      <div className="absolute inset-0 hidden dark:block">
        {/* Deep space base */}
        <div className="absolute inset-0 bg-linear-to-b from-[#0b0416] via-[#0d0620] to-[#0b0416]" />

        {/* Aurora glow – top */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[120vw] h-[380px] rounded-full blur-3xl opacity-70 animate-pulse-slow"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(52,211,153,0.15) 0%, rgba(6,182,212,0.1) 40%, transparent 75%)",
          }}
        />

        {/* Aurora glow orbs */}
        <div
          className="absolute top-1/3 -left-40 w-[450px] h-[350px] rounded-full blur-3xl opacity-60 animate-orb-slow"
          style={{
            background:
              "radial-gradient(circle, rgba(52,211,153,0.10) 0%, rgba(6,182,212,0.06) 50%, transparent 80%)",
            willChange: "transform",
          }}
        />
        <div
          className="absolute bottom-1/3 -right-40 w-[400px] h-[320px] rounded-full blur-3xl opacity-60 animate-orb-reverse"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.10) 0%, rgba(139,92,246,0.07) 50%, transparent 80%)",
            willChange: "transform",
          }}
        />

        {/* Subtle star-grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Static twinkling stars (pure CSS, compositor accelerated) */}
        {STATIC_STARS.map((star, i) => (
          <div
            key={`s-${i}`}
            className="absolute bg-white rounded-full animate-twinkle"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              boxShadow: `0 0 ${star.size * 3}px rgba(255,255,255,0.8)`,
              animationDuration: star.dur,
              animationDelay: star.delay,
              willChange: "opacity, transform",
            }}
          />
        ))}

        {/* Shooting stars */}
        {SHOOTING_STARS.map((star, i) => (
          <div
            key={`sh-${i}`}
            className="absolute rotate-[-42deg] animate-shooting"
            style={{
              top: star.top,
              left: star.left,
              animationDuration: star.dur,
              animationDelay: star.delay,
              willChange: "transform, opacity",
            }}
          >
            <div
              className="h-[2px] w-[140px]"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.9), rgba(52,211,153,0.8), transparent)",
                boxShadow: "0 0 6px rgba(255,255,255,0.8)",
              }}
            />
          </div>
        ))}

        {/* Dark-mode floating particles */}
        {PARTICLES.map((p, i) => (
          <div
            key={`dp-${i}`}
            className="absolute rounded-full animate-float-slow"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: i % 2 === 0 ? "rgba(52,211,153,0.7)" : "rgba(6,182,212,0.7)",
              boxShadow: `0 0 ${p.size * 3}px rgba(52,211,153,0.5)`,
              animationDuration: p.dur,
              animationDelay: p.delay,
              willChange: "transform",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function BackgroundFX() {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  if (!mounted) return null;
  return <BackgroundFXContent />;
}
