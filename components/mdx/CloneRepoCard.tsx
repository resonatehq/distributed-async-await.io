import { RepoCard } from "./RepoCard";

type Language = "TypeScript" | "Python" | "Rust" | "Go";

const sdkToLanguage: Record<string, Language> = {
  typescript: "TypeScript",
  python: "Python",
  rust: "Rust",
  go: "Go",
  TypeScript: "TypeScript",
  Python: "Python",
  Rust: "Rust",
  Go: "Go",
  "TypeScript SDK": "TypeScript",
  "Python SDK": "Python",
  "Rust SDK": "Rust",
  "Go SDK": "Go",
};

function repoNameFromUrl(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    const u = new URL(url);
    const parts = u.pathname.split("/").filter(Boolean);
    return parts[parts.length - 1];
  } catch {
    return undefined;
  }
}

interface CloneRepoCardProps {
  // New Docusaurus-style props
  sdk?: string;
  link?: string;
  // Original props
  name?: string;
  href?: string;
  description?: string;
  language?: Language;
}

export default function CloneRepoCard({ sdk, link, name, href, description, language }: CloneRepoCardProps) {
  const resolvedLanguage = language || (sdk ? sdkToLanguage[sdk] : undefined);
  const resolvedHref = href || link || "#";
  const resolvedName = name || repoNameFromUrl(resolvedHref) || "Repository";

  return <RepoCard name={resolvedName} href={resolvedHref} description={description} language={resolvedLanguage} />;
}
