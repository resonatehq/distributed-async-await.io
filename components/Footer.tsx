import Link from "next/link";
import { Github } from "lucide-react";

const footerLinks = {
  handbook: [
    { label: "Start reading", href: "/introduction" },
    { label: "The protocol at a glance", href: "/protocol-at-a-glance" },
    { label: "Specification", href: "https://docs.resonatehq.io/spec" },
    { label: "Resonate docs", href: "https://docs.resonatehq.io" },
  ],
  community: [
    { label: "Discord", href: "https://www.resonatehq.io/discord" },
    { label: "GitHub", href: "https://github.com/resonatehq" },
    { label: "Ask Echo", href: "https://echo.resonatehq.io" },
    { label: "Journal", href: "https://journal.resonatehq.io" },
    { label: "X / Twitter", href: "https://x.com/resonatehqio" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/resonatehqio" },
  ],
  company: [
    { label: "Home", href: "https://www.resonatehq.io" },
    { label: "Privacy Policy", href: "https://www.resonatehq.io/privacy-policy" },
    { label: "Terms", href: "https://www.resonatehq.io/terms-and-conditions" },
  ],
};

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isExternal = href.startsWith("http");
  if (isExternal) {
    return (
      <a href={href} className="text-sm text-bright-gray-500 dark:text-muted hover:text-bright-gray-900 dark:hover:text-primary transition" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className="text-sm text-bright-gray-500 dark:text-muted hover:text-bright-gray-900 dark:hover:text-primary transition">
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-bright-gray-200 dark:border-primary/10 mt-16 font-sans">
      <div className="px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="22"
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
              <span className="font-display text-lg font-semibold text-bright-gray-900 dark:text-white">resonate</span>
            </div>
            <p className="font-serif text-sm text-bright-gray-500 dark:text-muted">
              Durable execution. Dead simple.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-display text-sm font-semibold text-bright-gray-900 dark:text-white mb-4">Handbook</h3>
            <ul className="space-y-2">
              {footerLinks.handbook.map((link) => (
                <li key={link.label}><FooterLink href={link.href}>{link.label}</FooterLink></li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-display text-sm font-semibold text-bright-gray-900 dark:text-white mb-4">Community</h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.label}><FooterLink href={link.href}>{link.label}</FooterLink></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display text-sm font-semibold text-bright-gray-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}><FooterLink href={link.href}>{link.label}</FooterLink></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-bright-gray-200 dark:border-primary/10 flex items-center justify-between">
          <p className="text-xs text-bright-gray-500 dark:text-muted">
            &copy; {new Date().getFullYear()} ResonateHQ, Inc.
          </p>
          <a
            href="https://github.com/resonatehq"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bright-gray-500 dark:text-muted hover:text-bright-gray-900 dark:hover:text-primary transition"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
