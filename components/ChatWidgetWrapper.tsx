"use client";

import dynamic from "next/dynamic";

const GlobalChatWidget = dynamic(
  () => import("./GlobalChatWidget").then((mod) => mod.GlobalChatWidget),
  { ssr: false }
);

export default function ChatWidgetWrapper() {
  return <GlobalChatWidget />;
}
