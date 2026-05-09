## 2026-05-09 - Information Exposure via Raw Database Errors
**Vulnerability:** Express API endpoints are returning raw database error messages (`err.message`) directly to the client instead of generic error messages.
**Learning:** This exposes sensitive database schema information, query structure, and potential data state to the end user or an attacker, facilitating SQL injection or other attacks.
**Prevention:** Always catch database errors, log them server-side via `console.error(err)`, and return a generic error message (e.g., `{ "error": "Internal server error" }`) to the client.
