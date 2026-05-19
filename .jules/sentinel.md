## 2024-05-19 - [Prevent Information Exposure via Database Errors]
**Vulnerability:** The Express API endpoints returned raw database error messages (`err.message`) to the client on failure, potentially leaking sensitive database schema and state information.
**Learning:** Returning unhandled database exceptions directly to the client exposes internal implementation details which is a security risk. Express error handling should always return generic messages.
**Prevention:** Always log exceptions server-side using `console.error(err)` and return a generic `{ "error": "Internal server error" }` to the client instead. Catch and handle database query failures defensively.
