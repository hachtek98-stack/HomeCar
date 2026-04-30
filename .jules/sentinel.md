## 2024-05-18 - Prevent Database Information Leakage
**Vulnerability:** The application was directly returning raw SQLite `err.message` to clients on 500 errors (e.g., `res.status(500).json({ error: err.message })`).
**Learning:** Returning raw database errors in API responses is a critical information leakage risk, as it can expose database schemas, internal constraints, and query structures to attackers, aiding in further exploitation (like SQL injection).
**Prevention:** Always catch database errors, log the detailed error internally (`console.error` or a logging library) for debugging, and return a generic, secure message like "Internal server error" to the client.
