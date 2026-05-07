## 2026-05-07 - Prevent PII Exposure in API
**Vulnerability:** The `GET /api/requests` endpoint exposed the patient's phone number for all requests, regardless of status, potentially leaking PII to unauthorized users.
**Learning:** Relying on frontend filtering or missing server-side role validation can lead to data exposure. Data privacy enforcement, like masking PII, must happen directly within database queries.
**Prevention:** Conditionally mask PII in SQL queries based on request status or user role (e.g., `CASE WHEN status = 'confirmed' THEN phone ELSE NULL END`).
