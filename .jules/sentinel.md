## 2024-05-11 - Information Exposure via Raw DB Errors
**Vulnerability:** Multiple backend endpoints were returning raw database error messages (`err.message`) in HTTP 500 responses (e.g., `res.status(500).json({ error: err.message })`).
**Learning:** Returning unhandled or raw database errors directly to the client exposes underlying database structure and state, making it a target for information leakage.
**Prevention:** Always log the actual raw error server-side (e.g., `console.error(err)`) and return a generic error message (e.g., `Internal server error`) to the client.
