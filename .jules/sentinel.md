## 2026-05-23 - Excessive Data Exposure in API
**Vulnerability:** The `/api/requests` endpoint was returning sensitive `patientPhone` numbers in the response to all users.
**Learning:** Returning all columns or directly mapping joins can expose Personally Identifiable Information (PII) if there is no role-based or status-based check on the backend.
**Prevention:** Mask PII at the database level by conditionally selecting values based on user role and request status (e.g. `CASE WHEN r.status = 'confirmed' THEN u.phone ELSE NULL END`).
## 2026-05-24 - Information Exposure in API Responses
**Vulnerability:** The backend endpoints were catching database errors and returning the raw `err.message` directly to the client in a 500 JSON response (e.g., `res.status(500).json({ error: err.message })`).
**Learning:** Exposing raw database error messages provides potential attackers with internal details about the database structure, query schemas, and server state.
**Prevention:** Catch database errors, log the actual error object server-side using `console.error(err)` for debugging, and return a generic error message (e.g., `'Internal server error'`) to the client.
