"use client";

import MDEditor from "@uiw/react-md-editor";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function MarkdownRender({ content }: { content: string }) {
  const { theme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <div data-color-mode={currentTheme === "dark" ? "dark" : "light"}>
      <MDEditor.Markdown
        source={content}
        style={{ background: "transparent" }}
      />
    </div>
  );
}