## 2024-05-24 - Do not expose internal details in error responses
**Vulnerability:** The backend exposed the raw SQLite error messages to clients via `res.status(500).json({ error: err.message })`.
**Learning:** Returning unhandled database exceptions or internal stack traces can leak structural information about the database schema and queries, aiding attackers in crafting targeted injection attacks or bypassing security constraints.
**Prevention:** Ensure that global or route-specific error handlers log the full error context locally on the server (`console.error(err)` or a structured logger) but respond to clients with generic, sanitized messages like `Internal server error`.
