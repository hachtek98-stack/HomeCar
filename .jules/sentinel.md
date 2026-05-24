## 2026-05-23 - Excessive Data Exposure in API
**Vulnerability:** The `/api/requests` endpoint was returning sensitive `patientPhone` numbers in the response to all users.
**Learning:** Returning all columns or directly mapping joins can expose Personally Identifiable Information (PII) if there is no role-based or status-based check on the backend.
**Prevention:** Mask PII at the database level by conditionally selecting values based on user role and request status (e.g. `CASE WHEN r.status = 'confirmed' THEN u.phone ELSE NULL END`).
