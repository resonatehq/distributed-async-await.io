"use client";

import { useEffect, useState } from "react";
import type { TableOfContents as TOCType } from "fumadocs-core/server";

interface TOCProps {
  toc: TOCType;
}

export default function TableOfContents({ toc }: TOCProps) {
  const [activeId, setActiveId] = useState<string>(() =>
    toc.length > 0 ? toc[0].url.slice(1) : ""
  );

  useEffect(() => {
    if (toc.length === 0) return;

    // Seed with the first heading on mount so the active indicator is visible
    // before the user scrolls.
    setActiveId(toc[0].url.slice(1));

    const headings: HTMLElement[] = [];
    for (const item of toc) {
      const el = document.getElementById(item.url.slice(1));
      if (el) headings.push(el);
    }
    if (headings.length === 0) return;

    // Scroll-based picker: on every scroll, the active heading is the one whose
    // top has just crossed a fixed activation line (~100px from the top of the
    // viewport). This is more reliable than IntersectionObserver for TOCs
    // because only one heading can be "active" at a time regardless of how
    // many are simultaneously visible.
    const ACTIVATION_LINE = 100;
    let ticking = false;
    const update = () => {
      ticking = false;
      let current = headings[0];
      for (const h of headings) {
        const top = h.getBoundingClientRect().top;
        if (top - ACTIVATION_LINE <= 0) {
          current = h;
        } else {
          break;
        }
      }
      if (current && current.id !== activeId) {
        setActiveId(current.id);
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // activeId intentionally not in deps — update() reads the latest value via
    // closure refresh on the next re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <div className="w-48 shrink-0 hidden xl:block font-sans">
      <div className="sticky top-[89px] py-6">
        <p className="text-xs font-display font-semibold uppercase tracking-wider text-bright-gray-500 dark:text-muted mb-3">
          On this page
        </p>
        <ul className="space-y-1.5">
          {toc.map((item) => (
            <li key={item.url}>
              <a
                href={item.url}
                className={`block text-xs leading-relaxed transition-colors border-l-2 ${
                  item.depth > 2 ? "pl-5" : "pl-3"
                } ${
                  activeId === item.url.slice(1)
                    ? "text-bright-gray-900 dark:text-primary font-medium border-secondary"
                    : "text-bright-gray-500 dark:text-muted hover:text-bright-gray-900 dark:hover:text-primary border-transparent"
                }`}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
