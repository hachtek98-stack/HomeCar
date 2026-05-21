## 2024-05-21 - Information Exposure

**Vulnerability:** Information Exposure. Uncaught database errors were returning raw error strings (e.g., `err.message`) to the client, leaking sensitive database schema or query structures.
**Learning:** Returning unhandled database exceptions back to clients allows an attacker to gain insights into database structure, types and constraints, making further exploitation easier. Express.js error blocks need to be manually inspected to ensure they return generic error responses and not detailed logs.
**Prevention:** Catch all database errors on endpoints and explicitly log the raw details to `console.error(err)` server-side, while responding to the client with a generic message like `{ error: 'Internal server error' }`.
