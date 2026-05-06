# Documentation Index

EnternFlix is a Next.js 16 streaming UI built on the App Router with TanStack Query, hls.js, Tailwind, and a centralized Axios layer that talks to a generic content API. These docs describe the production architecture as it actually exists in `src/` — not aspirations.

## Reading Order

1. [ARCHITECTURE.md](ARCHITECTURE.md) — high-level structure, RSC vs Client, data flow.
2. [FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md) — where files live and why.
3. [CONFIGURATION.md](CONFIGURATION.md) — environment variables.
4. [API.md](API.md) — endpoints, services, query hooks.
5. [STATE_MANAGEMENT.md](STATE_MANAGEMENT.md) — server vs UI state, caching.
6. [SEO.md](SEO.md) — metadata, JSON-LD, sitemap, robots.
7. [SECURITY.md](SECURITY.md) — headers, CSP, XSS posture.
8. [AUTHENTICATION.md](AUTHENTICATION.md) — current state and roadmap.
9. [PERFORMANCE.md](PERFORMANCE.md) — caching, images, bundles.
10. [TESTING.md](TESTING.md) — Vitest setup and conventions.
11. [ACCESSIBILITY.md](ACCESSIBILITY.md) — a11y rules and QA checklist.
12. [DEPLOYMENT.md](DEPLOYMENT.md) — build, Docker, runtime, troubleshooting.
13. [TEMPLATE_GUIDE.md](TEMPLATE_GUIDE.md) — rebrand and adapt this template.

## Conventions Used in These Docs

- File paths are workspace-relative (e.g. `src/lib/api/customAxios.ts`).
- Tables describe schemas, env vars, hooks, and endpoints.
- Mermaid diagrams describe architecture and data flow.
- Code shown is verbatim from the repo at the time of writing — verify before relying on snippets.

## Out of Scope

- Backend implementation. See [bi8s-go](https://github.com/xanderbilla/bi8s-go).
- Cloud-specific deployment (Vercel, AWS, GCP). The app is a standard standalone Next.js server; deploy it like any Node app.
