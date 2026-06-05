"use client";

import { isValidElement, useRef, type HTMLAttributes, type ReactNode } from "react";
import CopyButton from "./CopyButton";

interface PreProps extends HTMLAttributes<HTMLPreElement> {
  children?: ReactNode;
  title?: string;
  "data-title"?: string;
}

const LANGUAGE_LABELS: Record<string, string> = {
  bash: "bash",
  c: "c",
  cpp: "c++",
  css: "css",
  diff: "diff",
  go: "go",
  graphql: "graphql",
  html: "html",
  java: "java",
  javascript: "javascript",
  js: "javascript",
  json: "json",
  jsx: "jsx",
  kotlin: "kotlin",
  md: "markdown",
  markdown: "markdown",
  mdx: "mdx",
  plaintext: "text",
  py: "python",
  python: "python",
  rs: "rust",
  rust: "rust",
  sh: "shell",
  shell: "shell",
  sql: "sql",
  swift: "swift",
  ts: "typescript",
  tsx: "tsx",
  toml: "toml",
  typescript: "typescript",
  yaml: "yaml",
  yml: "yaml",
};

// Shiki tags the inner <code> with `language-X`. Pull X out so the chrome can
// label even blocks that don't pass an explicit `title=`.
function extractLanguage(children: ReactNode): string | null {
  if (!isValidElement(children)) return null;
  const className = (children.props as { className?: string })?.className ?? "";
  const match = className.match(/language-([a-zA-Z0-9_+-]+)/);
  return match ? match[1] : null;
}

export function Pre({ children, title, "data-title": dataTitle, ...props }: PreProps) {
  const ref = useRef<HTMLDivElement>(null);
  const displayTitle = title || dataTitle;
  const lang = extractLanguage(children);
  const langLabel = lang ? (LANGUAGE_LABELS[lang.toLowerCase()] ?? lang.toLowerCase()) : null;

  return (
    <div className="group relative not-first:mt-4 last:mb-0">
      <div className="flex items-center justify-between gap-3 px-4 py-2 text-xs font-mono border border-b-0 border-bright-gray-200 dark:border-primary/10 bg-bright-gray-100 dark:bg-surface-subtle">
        <div className="flex items-center gap-2 min-w-0">
          {displayTitle ? (
            <>
              <span className="truncate text-bright-gray-900 dark:text-primary">{displayTitle}</span>
              {langLabel && (
                <span className="shrink-0 text-muted/60">·</span>
              )}
              {langLabel && (
                <span className="shrink-0 text-muted">{langLabel}</span>
              )}
            </>
          ) : (
            <span className="text-muted">{langLabel ?? "code"}</span>
          )}
        </div>
      </div>
      <div ref={ref} className="relative">
        <pre {...props} className={`${props.className || ""} !mt-0 !border-t-0`}>
          {children}
        </pre>
        <CopyButton containerRef={ref} />
      </div>
    </div>
  );
}
