"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { MessageCircle } from "lucide-react";

const GlobalChatWidget = dynamic(
  () => import("./GlobalChatWidget").then((mod) => mod.GlobalChatWidget),
  { ssr: false }
);

export default function ChatWidgetWrapper() {
  const [opened, setOpened] = useState(false);

  if (!opened) {
    return (
      <button
        type="button"
        onClick={() => setOpened(true)}
        aria-label="Open AI chat assistant"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 bg-black dark:bg-emerald-500 text-white dark:text-[#0b0416] z-50 flex items-center justify-center cursor-pointer ring-2 ring-white/10"
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
      </button>
    );
  }

  return <GlobalChatWidget initialOpen={true} onClose={() => setOpened(false)} />;
}
