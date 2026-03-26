"use client";

import { useEffect, useState } from "react";

export default function ShootingStars() {
  const [shootingStars, setShootingStars] = useState<{ id: number; x: number; y: number; delay: number; duration: number }[]>([]);
  const [staticStars, setStaticStars] = useState<{ id: number; x: number; y: number; size: number; opacity: number }[]>([]);

  useEffect(() => {
    // Generate static background stars
    setStaticStars(
      Array.from({ length: 80 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
      }))
    );

    // Generate animated shooting stars
    setShootingStars(
      Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 15,
        duration: Math.random() * 3 + 2,
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none hidden dark:block">
      {/* Static Twinkling Stars */}
      {staticStars.map((star) => (
        <div
          key={`static-${star.id}`}
          className="absolute bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          style={{
            top: `${star.y}%`,
            left: `${star.x}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${Math.random() * 4 + 2}s`,
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
          <div
            className="h-[2px] w-[150px] bg-gradient-to-r from-transparent via-white to-transparent animate-shooting-star opacity-0 shadow-[0_0_10px_rgba(255,255,255,1)]"
            style={{
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
