## 2024-05-03 - Prevent Information Exposure via Database Errors
**Vulnerability:** Raw database error messages (`err.message`) were being returned directly to the client in 500 status responses across multiple API endpoints in `backend/index.js`.
**Learning:** Returning unhandled database errors directly to clients leaks internal database structure (e.g., table names, constraints) and can aid attackers in mapping the backend for SQL injection or other attacks.
**Prevention:** Catch database errors, log the detailed error server-side using `console.error(err)`, and return a generic error message like `{ "error": "Internal server error" }` to the client.
