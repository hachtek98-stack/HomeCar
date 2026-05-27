## 2026-05-23 - Excessive Data Exposure in API
**Vulnerability:** The `/api/requests` endpoint was returning sensitive `patientPhone` numbers in the response to all users.
**Learning:** Returning all columns or directly mapping joins can expose Personally Identifiable Information (PII) if there is no role-based or status-based check on the backend.
**Prevention:** Mask PII at the database level by conditionally selecting values based on user role and request status (e.g. `CASE WHEN r.status = 'confirmed' THEN u.phone ELSE NULL END`).

## 2026-05-23 - Information Exposure via Error Messages
**Vulnerability:** The Express backend was returning raw SQLite error messages (`err.message`) directly to the client on `500` status codes across 7 different routes.
**Learning:** Returning database or system error messages to the client can leak sensitive information about the internal schema, structure, or state of the backend application to potential attackers.
**Prevention:** Catch all internal database errors, log them server-side via `console.error(err)`, and return a generic, safe error message to the client (e.g., `{ error: 'Internal server error' }`).
