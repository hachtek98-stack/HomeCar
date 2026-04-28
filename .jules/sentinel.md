## 2024-04-28 - Secure Error Handling in Express API
**Vulnerability:** The Express API was returning raw database error messages (`err.message`) to the client in its 500 status responses (Information Exposure).
**Learning:** Sending raw database errors directly to clients leaks internal database structure and query details, which attackers can use to map the system for potential injection attacks.
**Prevention:** Always log the detailed error internally (`console.error`) and return a generic error message (e.g., 'Internal server error') to the client to fail securely.
