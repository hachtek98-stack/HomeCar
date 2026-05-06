## 2024-05-24 - Information Exposure in Express.js Error Handling
**Vulnerability:** Database errors were being directly returned to clients via `err.message` in HTTP 500 responses.
**Learning:** The Express API endpoints lacked secure error handling, which led to raw database error strings leaking to the client. This exposes internal implementation details and database structures.
**Prevention:** Always catch database errors, log them server-side via `console.error(err)`, and return a generic error message (e.g., `{ "error": "Internal server error" }`) to the client.
