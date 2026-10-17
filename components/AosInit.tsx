"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export const AosInit = () => {
  useEffect(() => {
    const init = () => {
      AOS.init({
        once: true,
        disable: "phone",
        duration: 800,
        easing: "ease-out-cubic",
      });
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(init);
    } else {
      setTimeout(init, 100);
    }
  }, []);

  return null;
};
