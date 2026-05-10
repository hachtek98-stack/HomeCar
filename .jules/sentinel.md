## 2023-10-27 - Information Exposure in Express Error Responses
**Vulnerability:** Found multiple instances in `backend/index.js` where `err.message` was directly returned to the client in HTTP 500 error responses (`res.status(500).json({ error: err.message })`).
**Learning:** This exposes internal database structures or server configuration to the user, acting as a reconnaissance vector for attackers.
**Prevention:** Always catch exceptions, log the detailed error internally (`console.error(err)`), and return a generic error message (e.g., "Internal server error") to the client.