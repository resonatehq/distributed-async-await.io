# distributed-async-await.io

The home of the **Distributed Async Await protocol**, in three tracks:

- **[/spec](https://distributed-async-await.io/spec)** — the prose specification (protocol definitions,
  models, and the durable-promise contract).
- **[/server](https://distributed-async-await.io/server)** — how to build a conformant Distributed Async
  Await server.
- **[/sdk](https://distributed-async-await.io/sdk)** — how to build an SDK that implements the protocol
  in any language.

The Distributed Async Await protocol is specified twice, on purpose.
[github.com/resonatehq/resonate-specification](https://github.com/resonatehq/resonate-specification) is
the executable abstract machine in Lean 4 — the normative, machine-checkable definition of the protocol's core handlers
and state transitions. This site is the prose specification: the human-readable companion that explains
the same protocol. Where prose and Lean disagree, the Lean model wins.

For how to *use* Resonate, the protocol's reference implementation, see
**[docs.resonatehq.io](https://docs.resonatehq.io)** (adopter docs + SDK guides).

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

Content lives in [`content/docs/`](content/docs/) as MDX, one folder per track (`spec/`, `server/`,
`sdk/`). Track and page order is set in each folder's `meta.json`. Handbook pages keep a body `# H1` —
it is the load-bearing title for search and downstream ingestion.
