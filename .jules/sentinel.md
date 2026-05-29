## 2026-05-23 - Excessive Data Exposure in API
**Vulnerability:** The `/api/requests` endpoint was returning sensitive `patientPhone` numbers in the response to all users.
**Learning:** Returning all columns or directly mapping joins can expose Personally Identifiable Information (PII) if there is no role-based or status-based check on the backend.
**Prevention:** Mask PII at the database level by conditionally selecting values based on user role and request status (e.g. `CASE WHEN r.status = 'confirmed' THEN u.phone ELSE NULL END`).

## 2026-05-29 - Information Exposure in API Error Handling
**Vulnerability:** API endpoints were returning raw database error messages (`err.message`) directly to the client in HTTP 500 responses.
**Learning:** Exposing raw error strings or stack traces can inadvertently reveal sensitive internal system details, such as database schemas, file paths, or third-party constraints, to potential attackers.
**Prevention:** Catch errors, log them server-side (e.g., `console.error`), and return generic, safe error messages (e.g., `Internal server error`) to the client to prevent information leakage.
