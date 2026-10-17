"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const GlobalChatWidget = dynamic(
  () => import("./GlobalChatWidget").then((mod) => mod.GlobalChatWidget),
  { ssr: false }
);

export default function ChatWidgetWrapper() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(() => setReady(true));
    } else {
      setTimeout(() => setReady(true), 200);
    }
  }, []);

  if (!ready) return null;
  return <GlobalChatWidget />;
}
