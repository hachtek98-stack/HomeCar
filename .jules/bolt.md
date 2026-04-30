## 2026-04-30 - [Server-side Filtering for Heavy Payloads]
**Learning:** Relying on client-side filtering for endpoints that return base64 encoded images (like `/api/requests`) can cause significant memory bloat, out-of-memory errors on React Native, and unnecessary network latency.
**Action:** Always perform role-based data filtering on the backend (e.g., passing `nurseId` as a query parameter) to minimize API payload size, especially when rows contain large string payloads.
