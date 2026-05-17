## 2026-05-17 - [Information Exposure] Exposing database errors in Express APIs
**Vulnerability:** Raw database error messages (like `err.message` from sqlite3) were being sent directly to the client in HTTP 500 responses via `res.status(500).json({ error: err.message })`.
**Learning:** Returning raw database or system error messages to the client exposes internal implementation details (such as database type, schema structure, or query details) which attackers can use to craft more targeted attacks (like SQL injection).
**Prevention:** Catch database and system errors, log them server-side for debugging (e.g., `console.error(err)`), and always return a generic error message (e.g., `res.status(500).json({ error: 'Internal server error' })`) to the client.
