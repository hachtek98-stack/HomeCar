## 2026-05-08 - Fix PII Data Exposure and Information Leakage
**Vulnerability:** The backend exposed patient phone numbers (PII) before requests were confirmed and leaked internal database error messages (`err.message`) to the client.
**Learning:** Over-fetching or missing authorization checks in SQL queries (`SELECT r.*, u.phone as patientPhone`) exposed sensitive data prematurely. Returning raw database errors provides attackers with internal schema and state details.
**Prevention:** Mask PII conditionally directly within database queries (e.g., `CASE WHEN r.status = 'confirmed' THEN u.phone ELSE NULL END`). Catch database errors, log them server-side via `console.error(err)`, and return a generic error message (`{ "error": "Internal server error" }`) to the client.
