## 2026-05-23 - Excessive Data Exposure in API
**Vulnerability:** The `/api/requests` endpoint was returning sensitive `patientPhone` numbers in the response to all users.
**Learning:** Returning all columns or directly mapping joins can expose Personally Identifiable Information (PII) if there is no role-based or status-based check on the backend.
**Prevention:** Mask PII at the database level by conditionally selecting values based on user role and request status (e.g. `CASE WHEN r.status = 'confirmed' THEN u.phone ELSE NULL END`).

## 2026-05-25 - Information Exposure in API errors
**Vulnerability:** Multiple API endpoints in `backend/index.js` returned raw database errors (`err.message`) to the client upon query failures.
**Learning:** Exposing internal error details, like schema structure or database logic, provides attackers with valuable reconnaissance information.
**Prevention:** Catch errors, log them server-side via `console.error(err)`, and return a generic `{ "error": "Internal server error" }` to the client.
