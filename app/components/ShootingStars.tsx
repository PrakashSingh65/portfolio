"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ShootingStars() {
  const [mounted, setMounted] = useState(false);
  const [shootingStars, setShootingStars] = useState<{ id: number; x: number; y: number; delay: number; duration: number }[]>([]);
  const [staticStars, setStaticStars] = useState<{ id: number; x: number; y: number; size: number; opacity: number; pulseDuration: number }[]>([]);

  useEffect(() => {
    setMounted(true);
    // Generate static background stars
    setStaticStars(
      Array.from({ length: 80 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        pulseDuration: Math.random() * 4 + 2,
      }))
    );

    // Generate animated shooting stars
    setShootingStars(
      Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 15,
        duration: Math.random() * 3 + 2,
      }))
    );
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none hidden dark:block">
      {/* Static Twinkling Stars */}
      {staticStars.map((star) => (
        <motion.div
          key={`static-${star.id}`}
          className="absolute bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          style={{
            top: `${star.y}%`,
            left: `${star.x}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [star.opacity * 0.4, star.opacity, star.opacity * 0.4],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.pulseDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Shooting Stars */}
      {shootingStars.map((star) => (
        <div
          key={`shooting-${star.id}`}
          className="absolute"
          style={{
            top: `${star.y}%`,
            left: `${star.x}%`,
            transform: "rotate(-45deg)",
          }}
        >
          <motion.div
            className="h-[2px] w-[150px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_10px_rgba(255,255,255,1)]"
            initial={{ x: 0, opacity: 0 }}
            animate={{
              x: [0, -1500],
              opacity: [0, 1, 1, 0],
            }}
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
              }
            }}
          />
        </div>
      ))}
    </div>
  );
}
