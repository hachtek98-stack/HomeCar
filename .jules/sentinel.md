## 2024-04-30 - Database Information Exposure
**Vulnerability:** The Express API was passing raw database error messages (`err.message`) directly to the client in JSON responses (e.g., `res.status(500).json({ error: err.message })`).
**Learning:** Returning unhandled database errors to the frontend exposes internal database schemas, query structures, and potentially sensitive data, which attackers can use to map the backend and craft targeted attacks (like SQL injection).
**Prevention:** Always log the detailed error internally (`console.error`) for debugging, and return a generic, sanitized error message to the client (e.g., 'Internal Server Error').
