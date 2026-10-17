"use client";

import { useEffect } from "react";
import "aos/dist/aos.css";

export const AosInit = () => {
  useEffect(() => {
    let initialized = false;

    const runAos = async () => {
      if (initialized) return;
      initialized = true;
      try {
        const AOS = (await import("aos")).default;
        AOS.init({
          once: true,
          disable: "phone",
          duration: 800,
          easing: "ease-out-cubic",
        });
      } catch {
        // Fallback gracefully
      }
    };

    // Initialize on first scroll/touch or after 3.5s
    const onInteraction = () => {
      runAos();
      window.removeEventListener("scroll", onInteraction);
      window.removeEventListener("touchstart", onInteraction);
    };

    window.addEventListener("scroll", onInteraction, { passive: true });
    window.addEventListener("touchstart", onInteraction, { passive: true });

    const timer = setTimeout(runAos, 3500);

    return () => {
      window.removeEventListener("scroll", onInteraction);
      window.removeEventListener("touchstart", onInteraction);
      clearTimeout(timer);
    };
  }, []);

  return null;
};
