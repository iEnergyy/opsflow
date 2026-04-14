import { Hono } from "hono"

/**
 * Hono app for HTTP API routes. Mounted under `/api` by the web server entry.
 * Handlers are placeholders until domain use cases and persistence exist.
 */
export function createApiApp(): Hono {
  const app = new Hono().basePath("/api")

  app.get("/health", (c) =>
    c.json({ status: "ok", service: "opsflow-api" }),
  )

  app.get("/v1/status", (c) =>
    c.json({
      version: "0.0.1",
      message:
        "API surface is not fully mapped yet; placeholder responses only.",
    }),
  )

  app.get("/v1/placeholder/bookings", (c) =>
    c.json({ items: [], message: "placeholder" }),
  )

  app.get("/v1/placeholder/organizations", (c) =>
    c.json({ items: [], message: "placeholder" }),
  )

  return app
}
