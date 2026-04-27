## 2024-04-27 - [MEDIUM] Database Information Exposure in Error Responses
**Vulnerability:** The backend currently returns raw SQLite database error messages directly to the client when a database query fails (e.g., `res.status(500).json({ error: err.message });`). This can expose sensitive information about the database schema, such as table names, column names, and constraints.
**Learning:** Returning raw database error messages is a common pattern that can lead to information exposure. This is often done for debugging purposes but should not be exposed in a production environment.
**Prevention:** Implement centralized error handling that logs the detailed error internally for debugging and returns generic, sanitized error messages (e.g., 'Internal server error') to the client.
