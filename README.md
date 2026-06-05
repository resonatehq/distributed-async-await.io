# distributed-async-await.io

The **SDK author's handbook** for [Resonate](https://www.resonatehq.io) — how to build a Resonate SDK
that implements the Distributed Async Await protocol in any language.

This site is the implementer-facing companion to the two other Resonate documentation surfaces:

- **[docs.resonatehq.io](https://docs.resonatehq.io)** — how to *use* Resonate (adopter docs + SDK guides).
- **[docs.resonatehq.io/spec](https://docs.resonatehq.io/spec)** — the formal Distributed Async Await
  specification (the protocol, definitions, and models).
- **distributed-async-await.io** (this repo) — how to *build* an SDK against that spec.

The seam: the spec tells you what wire bytes to produce; this handbook teaches you how to turn those
bytes into an idiomatic library someone wants to use.

## Stack

Next.js 15 + [Fumadocs](https://fumadocs.dev) 15, MDX content, Tailwind, deployed on Vercel. The
scaffold and brand tokens are shared with `docs.resonatehq.io`; the handbook leans the ember accent
to differentiate from the teal-leaning spec.

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # next build + llms.txt generation
npm run check-links  # linkinator over the built site
```

Content lives in [`content/docs/`](content/docs/) as MDX. Chapter order is set in
[`content/docs/meta.json`](content/docs/meta.json). Every page keeps a body `# H1` — it is the
load-bearing title for search and downstream ingestion.
