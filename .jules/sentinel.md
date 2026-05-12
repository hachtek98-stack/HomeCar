## 2024-05-24 - [Information Exposure]
**Vulnerability:** Raw database errors (`err.message`) were directly returned to the client in Express API error responses (e.g., `res.status(500).json({ error: err.message })`).
**Learning:** This exposes sensitive database schema information and potential attack vectors to external clients. It existed because of overly simplistic error handling.
**Prevention:** Always log the raw error securely on the server using `console.error(err)` and return a generic error message (e.g., `{ "error": "Internal server error" }`) to the client.
