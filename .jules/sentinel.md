## 2024-05-20 - Fix Information Exposure in Express API
**Vulnerability:** The Express API was returning raw database error messages (`err.message`) in HTTP 500 responses to the client (e.g., `res.status(500).json({ error: err.message })`).
**Learning:** Returning unhandled or raw database errors directly to the client can expose internal database schema details, sensitive application logic, or specific underlying system vulnerabilities, creating an Information Exposure vulnerability.
**Prevention:** Always catch and log specific internal errors server-side (e.g., via `console.error(err)` or a dedicated logging service) and return generic, sanitized error messages (e.g., `'Internal server error'`) to the client to fail securely.
