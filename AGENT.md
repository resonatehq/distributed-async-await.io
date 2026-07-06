# AGENT.md — distributed-async-await.io

Guidance for agents working in this repo. Read this before editing content.

## What this site is

The home of the **Distributed Async Await (DAA) protocol**, in three tracks:

| Track | URL prefix | Content dir | What it is |
|---|---|---|---|
| Specification | `/spec` | `content/docs/spec/` | The prose specification: programming model, execution model, system model, glossary. Migrated verbatim from docs.resonatehq.io/spec (2026-07). |
| Build a server | `/server` | `content/docs/server/` | Server implementers' guide: how to build a conformant DAA server. |
| Build an SDK | `/sdk` | `content/docs/sdk/` | SDK authors' handbook: how to build an SDK in any language. |

The root `content/docs/index.mdx` is the landing page routing the three audiences.
[docs.resonatehq.io](https://docs.resonatehq.io) is the separate, product-facing site — "using
Resonate" — and never hosts protocol-normative prose.

## The canonical statement (use verbatim where the spec/Lean relationship is described)

> The Distributed Async Await protocol is specified twice, on purpose.
> [`resonatehq/resonate-specification`](https://github.com/resonatehq/resonate-specification) is the
> executable abstract machine in Lean 4 — the normative, machine-checkable definition of the protocol's core handlers
> and state transitions. These pages are the prose specification: the human-readable companion that
> explains the same protocol. Where prose and Lean disagree, the Lean model wins.

## Drift rule (binding)

**Lean wins.** Before making or editing any claim about protocol *semantics* — handler behavior,
status codes, state transitions, version/lease rules, timeout behavior — verify it against the
current `main` of [`resonatehq/resonate-specification`](https://github.com/resonatehq/resonate-specification).
Do not trust prose (here or anywhere) over the Lean model, and do not propagate claims from older
docs without re-verification. The reference server (`resonatehq/resonate`, Rust) co-evolves with the
spec; treat it as evidence of intent, not as the definition.

Known deliberately-unreconciled surface: `spec/programming-model/durable-promise-specification.mdx`
carries the legacy durable-promise contract (`ikc`/`iku`/`strict` + the state-transition table) that
the Lean model does not cover — its scope note at the top of the page explains this. Do not "fix" it
to match the Lean model without an explicit decision.

## Never link these repos (private)

`resonate-server-specification`, `resonate-sdk-specification`, `resonate-protocol`,
`resonate-accordant`, `resonate-test`. They 404 for readers.

## Conventions

- Fumadocs MDX. Custom components (`Callout`, `DocCardList`, etc.) are registered in
  `app/[[...slug]]/page.tsx`.
- Frontmatter: `title` is the sidebar label; `pageTitle` (optional) overrides the rendered `<h1>`;
  `hideTitle: true` suppresses the template title when the body carries its own `# H1`.
  Only the root landing page may be titled "Home" — track index pages are titled "Overview".
- Intra-site links are site-absolute (`/spec/...`, `/sdk/...`, `/server/...`). Links to product docs
  are absolute `https://docs.resonatehq.io/...` URLs.
- Anchor IDs on migrated spec pages are load-bearing for external inbound links (especially
  `message-passing`'s `#address-schemes`, `#reserved-tags`, `#poll-address`, `#delivery-semantics`).
  Do not rename headings on those pages without adding redirect-equivalent anchors.
- Redirects live in `vercel.json`. Old root-level handbook URLs 308 to `/sdk/*`.

## Verify

```bash
npm run build        # next build + llms.txt generation
npm run check-links  # linkinator over the built site (also runs as postbuild)
```

Both must be green before opening a PR.
