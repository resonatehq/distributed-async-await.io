import { Github } from "lucide-react";

interface RepoCardProps {
  name: string;
  href: string;
  description?: string;
  language?: "TypeScript" | "Python" | "Rust" | "Go";
}

const langColors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  Python: "bg-yellow-500",
  Rust: "bg-orange-500",
  Go: "bg-cyan-500",
};

export function RepoCard({ name, href, description, language }: RepoCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-3 p-4 border border-primary/10 bg-bright-gray-50 dark:bg-surface-elevated transition-all duration-200 hover:border-accent-plum/30 hover:bg-bright-gray-100 dark:hover:bg-surface-subtle hover:-translate-y-0.5 hover:shadow-glow-sm focus-visible:outline-2 focus-visible:outline-secondary"
    >
      <Github size={16} className="text-muted mt-0.5 shrink-0" />
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm text-bright-gray-900 dark:text-white group-hover:text-accent-plum-300 transition truncate">
            {name}
          </span>
          {language && (
            <span className="flex items-center gap-1 text-xs text-muted">
              <span className={`w-2 h-2 rounded-full ${langColors[language] || "bg-gray-500"}`} />
              {language}
            </span>
          )}
        </div>
        {description && (
          <p className="text-xs text-muted mt-1">{description}</p>
        )}
      </div>
    </a>
  );
}

export function RepoGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4 not-prose">
      {children}
    </div>
  );
}
