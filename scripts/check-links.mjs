#!/usr/bin/env node
/**
 * Build-time link checker.
 *
 * Boots `next start` against the just-built .next/ output, walks every
 * internal link (including anchors), and fails the build if any internal
 * destination 404s. External destinations rot independently and are skipped.
 *
 * Skipped on Vercel — Vercel's build sandbox can't run `next start` while the
 * build is still executing. Run locally and via GitHub Actions instead.
 */

import { spawn } from "node:child_process";
import { LinkChecker } from "linkinator";

if (process.env.VERCEL) {
  console.log("[check-links] Skipped on Vercel.");
  process.exit(0);
}

const PORT = Number(process.env.CHECK_LINKS_PORT ?? 4119);
const ROOT = `http://localhost:${PORT}`;

const SKIP_PATTERNS = [
  "discord",
  "github",
  "linkedin",
  "twitter",
  "x\\.com",
  "youtube",
  "substack",
  "resonatehq\\.io/(?!docs)",
  "mailto:",
];

console.log(`[check-links] Starting next start on :${PORT}`);
const server = spawn("npx", ["next", "start", "--port", String(PORT)], {
  stdio: ["ignore", "pipe", "inherit"],
  env: { ...process.env },
});

let serverReady = false;
server.stdout.on("data", (chunk) => {
  const text = chunk.toString();
  process.stdout.write(text);
  if (!serverReady && /Ready|started server|Local:/i.test(text)) {
    serverReady = true;
  }
});

const cleanup = (code) => {
  if (!server.killed) server.kill("SIGTERM");
  process.exit(code);
};
process.on("SIGINT", () => cleanup(130));
process.on("SIGTERM", () => cleanup(143));

async function waitForServer(timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(ROOT, { method: "HEAD" });
      if (res.ok || (res.status >= 300 && res.status < 400)) return;
    } catch {
      // not yet
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`next start did not respond on ${ROOT} within ${timeoutMs}ms`);
}

try {
  await waitForServer();
  console.log(`[check-links] Server up — crawling ${ROOT}`);

  const checker = new LinkChecker();
  let internalBroken = 0;
  let externalBroken = 0;
  checker.on("link", (link) => {
    if (link.state !== "BROKEN") return;
    const isInternal = link.url.startsWith(ROOT);
    if (isInternal) {
      internalBroken++;
      console.log(`  BROKEN  ${link.status ?? "—"}  ${link.url}  (parent: ${link.parent ?? "—"})`);
    } else {
      externalBroken++;
      console.log(`  warn (external)  ${link.status ?? "—"}  ${link.url}  (parent: ${link.parent ?? "—"})`);
    }
  });

  const result = await checker.check({
    path: ROOT,
    recurse: true,
    linksToSkip: SKIP_PATTERNS,
    concurrency: 25,
  });

  console.log(
    `[check-links] Checked ${result.links.length} links — ${internalBroken} internal broken, ${externalBroken} external unreachable (warn-only).`,
  );
  cleanup(internalBroken > 0 ? 1 : 0);
} catch (err) {
  console.error("[check-links] Failed:", err);
  cleanup(1);
}
