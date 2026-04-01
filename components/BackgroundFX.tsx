"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ─── Types ─────────────────────────────────────────────────────────── */
interface StaticStar {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  pulseDuration: number;
}

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  floatY: number;
  floatDuration: number;
}

/* ─── Component ─────────────────────────────────────────────────────── */
export default function BackgroundFX() {
  const [mounted, setMounted] = useState(false);
  const [staticStars, setStaticStars] = useState<StaticStar[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setMounted(true);

    setStaticStars(
      Array.from({ length: 100 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.7 + 0.3,
        pulseDuration: Math.random() * 4 + 2,
      }))
    );

    setShootingStars(
      Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 60,
        delay: Math.random() * 18,
        duration: Math.random() * 2.5 + 1.5,
      }))
    );

    setParticles(
      Array.from({ length: 28 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 2,
        opacity: Math.random() * 0.35 + 0.1,
        floatY: Math.random() * 30 + 10,
        floatDuration: Math.random() * 8 + 5,
      }))
    );
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">

      {/* ── Layer 1 · Light-mode soft gradient mesh ──────────────────── */}
      <div className="absolute inset-0 block dark:hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-emerald-50/40 to-cyan-50/30" />

        {/* Drifting colour orbs */}
        <motion.div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(52,211,153,0.18) 0%, rgba(6,182,212,0.10) 50%, transparent 80%)",
            filter: "blur(60px)",
          }}
          animate={{ x: [0, 60, -30, 0], y: [0, 40, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(52,211,153,0.08) 50%, transparent 80%)",
            filter: "blur(55px)",
          }}
          animate={{ x: [0, -50, 30, 0], y: [0, -30, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 left-1/3 w-[450px] h-[450px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(167,243,208,0.20) 0%, rgba(103,232,249,0.10) 50%, transparent 80%)",
            filter: "blur(50px)",
          }}
          animate={{ x: [0, 40, -60, 0], y: [0, -50, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Subtle dot-grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle, #0f766e 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Light floating particles */}
        {particles.map((p) => (
          <motion.div
            key={`lp-${p.id}`}
            className="absolute rounded-full bg-emerald-400"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity * 0.6,
            }}
            animate={{ y: [-p.floatY / 2, p.floatY / 2, -p.floatY / 2] }}
            transition={{
              duration: p.floatDuration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ── Layer 2 · Dark-mode starfield + aurora ────────────────────── */}
      <div className="absolute inset-0 hidden dark:block">
        {/* Deep space base */}
        <div className="absolute inset-0 bg-linear-to-b from-[#0b0416] via-[#0d0620] to-[#0b0416]" />

        {/* Aurora glow – top */}
        <motion.div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[120vw] h-[380px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(52,211,153,0.12) 0%, rgba(6,182,212,0.08) 40%, transparent 75%)",
            filter: "blur(30px)",
          }}
          animate={{ opacity: [0.6, 1, 0.6], scaleX: [1, 1.08, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Aurora glow – mid-left */}
        <motion.div
          className="absolute top-1/3 -left-40 w-[500px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(52,211,153,0.09) 0%, rgba(6,182,212,0.06) 50%, transparent 80%)",
            filter: "blur(70px)",
          }}
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Aurora glow – mid-right */}
        <motion.div
          className="absolute bottom-1/3 -right-40 w-[450px] h-[350px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.09) 0%, rgba(139,92,246,0.06) 50%, transparent 80%)",
            filter: "blur(70px)",
          }}
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Subtle star-grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Static twinkling stars */}
        {staticStars.map((star) => (
          <motion.div
            key={`s-${star.id}`}
            className="absolute bg-white rounded-full"
            style={{
              top: `${star.y}%`,
              left: `${star.x}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              boxShadow: `0 0 ${star.size * 4}px rgba(255,255,255,0.7)`,
            }}
            animate={{
              opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: star.pulseDuration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Shooting stars */}
        {shootingStars.map((star) => (
          <div
            key={`sh-${star.id}`}
            className="absolute"
            style={{
              top: `${star.y}%`,
              left: `${star.x}%`,
              transform: "rotate(-42deg)",
            }}
          >
            <motion.div
              className="h-[2px] w-[160px]"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.9), rgba(52,211,153,0.8), transparent)",
                boxShadow: "0 0 8px rgba(255,255,255,0.8)",
              }}
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: [0, -1800], opacity: [0, 1, 1, 0] }}
              transition={{
                x: {
                  duration: star.duration,
                  delay: star.delay,
                  repeat: Infinity,
                  ease: "linear",
                },
                opacity: {
                  duration: star.duration,
                  delay: star.delay,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.05, 0.15, 1],
                },
              }}
            />
          </div>
        ))}

        {/* Dark-mode floating particles */}
        {particles.map((p) => (
          <motion.div
            key={`dp-${p.id}`}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              background: `rgba(${p.id % 2 === 0 ? "52,211,153" : "6,182,212"},1)`,
              boxShadow: `0 0 ${p.size * 3}px rgba(52,211,153,0.5)`,
            }}
            animate={{ y: [-p.floatY / 2, p.floatY / 2] }}
            transition={{
              duration: p.floatDuration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

    </div>
  );
}
