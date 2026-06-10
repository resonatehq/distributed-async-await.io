"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Github } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import SearchDialog from "./SearchDialog";

const navLinks = [
  { label: "Spec", href: "https://docs.resonatehq.io/spec", external: true },
  { label: "Docs", href: "https://docs.resonatehq.io", external: true },
  { label: "Ask Echo", href: "https://echo.resonatehq.io", external: true },
  { label: "Discord", href: "https://www.resonatehq.io/discord", external: true },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b border-bright-gray-200 dark:border-primary/10 font-sans">
      <div className="px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <a
              href="https://www.resonatehq.io"
              className="flex items-center gap-2 group focus-visible:outline-2 focus-visible:outline-secondary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="26"
                viewBox="0 0 432 472"
                aria-hidden="true"
              >
                <g stroke="currentColor" className="text-bright-gray-900 dark:text-white">
                  <path
                    strokeWidth="30"
                    style={{ fill: "var(--echo-fill)" }}
                    d="M218.632,60C107.088,60,15.374,138.248,15.374,236.252C15.374,292.38,39.0338,336.722,75.978,366.934C112.825,397.067,162.68,413,215.11,413C266.913,413,316.754,397.512,353.75,367.861C390.854,338.124,414.845,294.27,414.845,238.237C414.845,140.526,330.503,60,218.632,60Z"
                  />
                  <ellipse cx="109" cy="236" fill="currentColor" rx="50" ry="55" className="text-bright-gray-900 dark:text-white" />
                  <ellipse cx="321" cy="234" fill="currentColor" rx="50" ry="55" className="text-bright-gray-900 dark:text-white" />
                  <rect width="8" height="16" x="204" y="282" fill="currentColor" rx="4" transform="rotate(25 204 282)" className="text-bright-gray-900 dark:text-white" />
                  <rect width="8" height="16" x="217" y="285" fill="currentColor" rx="4" transform="rotate(-25 217 285)" className="text-bright-gray-900 dark:text-white" />
                </g>
              </svg>
              <span className="font-display text-xl font-semibold tracking-tight text-bright-gray-900 dark:text-white group-hover:text-secondary transition">
                Resonate
              </span>
            </a>
            <Link
              href="/"
              className="font-display text-xl font-semibold tracking-tight text-accent-ember-500 hover:text-accent-ember-600 transition focus-visible:outline-2 focus-visible:outline-secondary"
            >
              Handbook
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm text-bright-gray-700 dark:text-primary hover:text-secondary transition focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2"
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {link.label}
              </a>
            ))}
            <SearchDialog />
            <a
              href="https://github.com/resonatehq"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted hover:text-secondary transition focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <ThemeToggle />
            <Link
              href="/introduction"
              className="ml-2 bg-accent-ember text-surface-light px-4 py-2 text-sm font-semibold hover:bg-accent-ember-600 transition focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2"
            >
              Start reading
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-bright-gray-900 dark:text-primary hover:text-secondary transition focus-visible:outline-2 focus-visible:outline-secondary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-bright-gray-200 dark:border-primary/10 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-4 py-3 text-bright-gray-700 dark:text-primary hover:text-secondary hover:bg-bright-gray-50 dark:hover:bg-dark/40 transition"
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://github.com/resonatehq"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 text-bright-gray-700 dark:text-primary hover:text-secondary hover:bg-bright-gray-50 dark:hover:bg-dark/40 transition"
              aria-label="GitHub"
            >
              <Github size={18} />
              GitHub
            </a>
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-bright-gray-700 dark:text-primary text-sm">Theme</span>
              <ThemeToggle />
            </div>
            <div className="pt-2 px-4">
              <Link
                href="/introduction"
                className="block text-center bg-accent-ember text-surface-light px-4 py-3 font-semibold hover:bg-accent-ember-600 transition"
              >
                Start reading
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
