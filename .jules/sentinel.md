## 2026-05-23 - Excessive Data Exposure in API
**Vulnerability:** The `/api/requests` endpoint was returning sensitive `patientPhone` numbers in the response to all users.
**Learning:** Returning all columns or directly mapping joins can expose Personally Identifiable Information (PII) if there is no role-based or status-based check on the backend.
**Prevention:** Mask PII at the database level by conditionally selecting values based on user role and request status (e.g. `CASE WHEN r.status = 'confirmed' THEN u.phone ELSE NULL END`).

## 2026-05-24 - Information Exposure in API Error Handling
**Vulnerability:** The API endpoints were returning raw database error messages (`err.message`) in 500 status responses.
**Learning:** Sending unsanitized internal errors to the client can leak sensitive database schema information or stack traces, aiding attackers in further exploitation.
**Prevention:** Always catch internal errors, log them securely on the server (`console.error(err)`), and return generic error messages (e.g., `{"error": "Internal server error"}`) to the client.
