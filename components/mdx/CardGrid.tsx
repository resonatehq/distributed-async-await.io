import { type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CardProps {
  title: string;
  description?: string;
  href: string;
  icon?: ReactNode;
}

export function Card({ title, description, href, icon }: CardProps) {
  return (
    <Link
      href={href}
      className="group block p-5 border border-primary/10 bg-bright-gray-50 dark:bg-surface-elevated transition-all duration-200 hover:border-secondary/30 hover:bg-bright-gray-100 dark:hover:bg-surface-subtle hover:-translate-y-0.5 hover:shadow-glow-sm focus-visible:outline-2 focus-visible:outline-secondary"
    >
      <div className="flex items-start justify-between">
        <div>
          {icon && <div className="text-secondary mb-2">{icon}</div>}
          <h3 className="font-display text-sm font-semibold text-bright-gray-900 dark:text-white group-hover:text-secondary transition">
            {title}
          </h3>
          {description && (
            <p className="font-serif text-sm text-muted mt-1">{description}</p>
          )}
        </div>
        <ArrowRight
          size={14}
          className="text-muted group-hover:text-secondary transition mt-1 shrink-0"
        />
      </div>
    </Link>
  );
}

export function CardGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6 not-prose">
      {children}
    </div>
  );
}
