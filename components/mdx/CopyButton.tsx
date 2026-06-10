"use client";

import { useState, useCallback, type RefObject } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyButton({ containerRef }: { containerRef: RefObject<HTMLDivElement | null> }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const text = containerRef.current?.querySelector("code")?.textContent || "";
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [containerRef]);

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-1.5 text-muted hover:text-primary bg-bright-gray-100/80 dark:bg-surface-subtle/80 border border-primary/10 opacity-0 group-hover:opacity-100 transition-opacity focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-secondary"
      aria-label={copied ? "Copied" : "Copy code"}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}
