## 2024-05-13 - [Information Exposure via Database Errors]
**Vulnerability:** The Express API endpoints directly returned raw database error strings to the client (`res.status(500).json({ error: err.message })`).
**Learning:** This exposes sensitive database schema and internal architecture details, which can be leveraged for further attacks.
**Prevention:** Always log the raw error server-side (`console.error(err)`) and return a generic, sanitized error message (`{ error: 'Internal server error' }`) to the client.