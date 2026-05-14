## 2024-05-14 - Fix PII Exposure via Over-fetching in SQL

**Vulnerability:** The application was unconditionally exposing patient phone numbers (PII) to all users (including nurses who had not yet accepted a request) via the `GET /api/requests` endpoint.
**Learning:** The vulnerability occurred because the database query fetched and returned the patient's phone number without validating the request status. Role-based access control was not fully validated server-side.
**Prevention:** Mask Personally Identifiable Information (PII) directly via database queries using conditional logic (e.g., `CASE WHEN r.status = 'confirmed' THEN u.phone ELSE NULL END as patientPhone`) to enforce access control directly at the data layer before it reaches the API layer.
