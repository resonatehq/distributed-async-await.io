/**
 * Generate llms.txt and llms-full.txt for AI/LLM consumption.
 * Replaces the docusaurus-plugin-llms functionality.
 * Run: node scripts/generate-llms-txt.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";

const CONTENT_DIR = "content/docs";
const PUBLIC_DIR = "public";

function walkMdx(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...walkMdx(full));
    } else if (entry.endsWith(".mdx")) {
      files.push(full);
    }
  }
  return files;
}

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { title: "", description: "", body: content };
  const fm = match[1];
  const title = fm.match(/^title:\s*(.+)$/m)?.[1]?.trim() || "";
  const description = fm.match(/^description:\s*(.+)$/m)?.[1]?.trim() || "";
  const body = content.slice(match[0].length).trim();
  return { title, description, body };
}

function stripJsx(content) {
  // Remove JSX component tags but keep their text children
  return content
    .replace(/<\/?[A-Z][A-Za-z]*[^>]*>/g, "")
    .replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, "")
    .trim();
}

const files = walkMdx(CONTENT_DIR).sort();

// llms.txt — index with titles and URLs
const index = files.map((f) => {
  const rel = relative(CONTENT_DIR, f).replace(/\.mdx$/, "").replace(/\/index$/, "");
  const url = `/${rel}`;
  const content = readFileSync(f, "utf-8");
  const { title, description } = extractFrontmatter(content);
  return `- [${title || rel}](${url})${description ? `: ${description}` : ""}`;
});

writeFileSync(
  join(PUBLIC_DIR, "llms.txt"),
  `# Resonate Documentation\n\n> Resonate — durable execution, dead simple.\n\n${index.join("\n")}\n`
);

// llms-full.txt — full content concatenated
const fullContent = files.map((f) => {
  const rel = relative(CONTENT_DIR, f).replace(/\.mdx$/, "").replace(/\/index$/, "");
  const url = `/${rel}`;
  const content = readFileSync(f, "utf-8");
  const { title, body } = extractFrontmatter(content);
  const cleaned = stripJsx(body);
  return `---\nurl: ${url}\ntitle: ${title || rel}\n---\n\n${cleaned}`;
});

writeFileSync(
  join(PUBLIC_DIR, "llms-full.txt"),
  `# Resonate Documentation — Full Content\n\n${fullContent.join("\n\n---\n\n")}\n`
);

console.log(`Generated llms.txt (${files.length} entries) and llms-full.txt`);
