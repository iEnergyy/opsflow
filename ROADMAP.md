# OpsFlow — Roadmap

Phased delivery from foundation through advanced flexibility.

---

## Phase 0 — Foundation

Monorepo layout (pnpm workspace):

### `apps/`

| Path | Role |
|------|------|
| `web` | TanStack Start app — UI, SSR, server functions, and app-specific wiring. Consumes packages; keeps HTTP handlers thin. |

### `packages/`

| Path | Role |
|------|------|
| `api` | **Hono API layer** — routes, middleware, request/response mapping only. No business rules here; delegates to `core`. |
| `core` | **Business logic (very important)** — domain rules, workflows, validation orchestration, and use cases. This is the canonical place for “what OpsFlow does”; `api` and workers call into `core`, not the other way around. |
| `db` | **ORM** — Drizzle schema, migrations strategy, and shared DB client. All persistence shapes live here; `core` uses the client and repositories as needed. |
| `ai` | **AI service layer** — placeholder package: interfaces, env wiring, and stubs so later phases can plug real providers without reshaping the monorepo. |
| `queue` | **BullMQ** — connection config, queues, job definitions, and workers. Job handlers invoke `core` (same rules as HTTP: no duplicated business logic in workers). |
| `types` | **Shared contracts** — Zod schemas as source of truth, exported inferred TypeScript types, and any cross-package DTOs used by `api`, `web`, and workers. |

### Cross-cutting in Phase 0

- **Project setup** — Workspace boundaries, TypeScript project references or path aliases, env handling, lint/format/test baseline, and CI so every package stays buildable.
- **Auth** — **[Better Auth](https://www.better-auth.com/)** for authentication (sessions, OAuth/email flows as needed). Integrate with TanStack Start on `web` and protect Hono routes in `api`; keep session/user resolution consistent for multi-tenant checks.
- **Multi-tenancy** — Tenant model in `db`, tenant context in `core` (e.g. every use case receives tenant scope), and middleware in `api` / server functions in `web` that attach tenant identity from the authenticated session.
- **Data flow convention** — `web` or `api` → `core` → `db` / `queue`; `types` defines inputs/outputs; workers in `queue` mirror the same `core` entry points as HTTP.

### Acceptance criteria (Phase 0)

- **Workspace** — `pnpm install` succeeds; `apps/web` and every `packages/*` package typechecks (and builds, if a build script exists) from repo root without ad hoc steps.
- **`web`** — TanStack Start app boots locally; at least one server function or route demonstrates importing from `packages/types` and calling into `packages/core` (or `packages/api` via fetch) without circular dependency issues.
- **`api`** — Hono app mounts and serves a health or ping route; at least one authenticated (or session-aware) route exists; handlers parse/validate with Zod from `types` and delegate to `core` (no inline domain rules in route files).
- **`core`** — Public entry point(s) for use cases are documented or obvious; a minimal use case runs with an explicit tenant scope argument (even if it only returns a stub).
- **`db`** — Drizzle schema and shared client are exported from `db`; migrations or push workflow is documented in README or package script; `core` (or a thin repository in `db` consumed by `core`) can run a trivial query against the configured database in dev.
- **`types`** — Shared Zod schemas and inferred types are consumed by `api` and optionally `web`; breaking a schema fails typecheck where used.
- **`queue`** — Redis (or chosen broker) connection is configurable via env; a sample queue enqueues a job and a worker runs it successfully in dev; the worker handler calls `core` (not duplicate logic).
- **`ai`** — Package exports stable placeholder types/functions used by `web` or `api` without throwing in dev (real providers deferred to later phases).
- **Better Auth** — Sign-in and sign-out (or session establishment) work on `web`; `api` can resolve the same session/user identity for protected routes; session cookies or tokens behave as expected in local dev.
- **Multi-tenancy** — Tenant (or organization) is represented in `db`; tenant id is derived from the authenticated session and passed into `core` for the sample use case; cross-tenant access is not possible for that path by mistake (e.g. wrong tenant id rejected or impossible to request).
- **CI** — Pipeline runs lint and typecheck on PRs (and tests if present); main stays green.

## Phase 1 — Core engine

- Services CRUD
- Customers CRUD
- Resources
- Booking system

## Phase 2 — Scheduling UX

- Availability engine
- Calendar UI
- Assignment logic

## Phase 3 — CRM and payments

- CRM enhancements
- Manual payments
- Dashboard

## Phase 4 — Customer experience

- Public booking page
- Mobile optimization

## Phase 5 — Chat system

- Chat backend
- Chat UI

## Phase 6 — AI integration

- AI service layer
- Booking assistant
- Insights

## Phase 7 — Team features

- Staff management
- Multi-resource scheduling

## Phase 8 — Advanced flexibility

- Custom fields
- Workflow builder
