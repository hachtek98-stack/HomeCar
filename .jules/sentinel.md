## 2024-05-01 - Fix Excessive Data Exposure of Patient Phone Numbers
**Vulnerability:** The GET /api/requests endpoint was leaking patientPhone for all requests, regardless of status.
**Learning:** Business logic to protect privacy (hiding phone number until confirmed) was only enforced on the frontend, leaving the API vulnerable to exposing sensitive data.
**Prevention:** Enforce privacy rules directly in the SQL queries (e.g., using CASE WHEN status='confirmed' THEN field ELSE NULL END) or API controllers to ensure the backend only returns data the user is authorized to see at that specific state.
