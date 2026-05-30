## 2026-05-23 - Excessive Data Exposure in API
**Vulnerability:** The `/api/requests` endpoint was returning sensitive `patientPhone` numbers in the response to all users.
**Learning:** Returning all columns or directly mapping joins can expose Personally Identifiable Information (PII) if there is no role-based or status-based check on the backend.
**Prevention:** Mask PII at the database level by conditionally selecting values based on user role and request status (e.g. `CASE WHEN r.status = 'confirmed' THEN u.phone ELSE NULL END`).
## 2024-05-15 - Prevent Information Exposure via Error Messages
**Vulnerability:** Express API endpoints returned raw database errors (e.g., `err.message`) directly to the client on failure.
**Learning:** Returning unhandled database errors exposes internal system details (like schema information, SQL syntax, or database technology) which an attacker can use to craft more targeted attacks like SQL injection.
**Prevention:** Catch database errors, log them server-side for debugging (`console.error`), and return a generic error message (`{ "error": "Internal server error" }`) to the client.
