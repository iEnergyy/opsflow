import handler, { createServerEntry } from "@tanstack/react-start/server-entry"
import { createApiApp } from "@workspace/api"

const apiApp = createApiApp()

export default createServerEntry({
  fetch(request) {
    const pathname = new URL(request.url).pathname
    if (pathname.startsWith("/api")) {
      return apiApp.fetch(request)
    }
    return handler.fetch(request)
  },
})
