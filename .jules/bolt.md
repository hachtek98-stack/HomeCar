## 2026-05-01 - Base64 Payload Memory Bottleneck
**Learning:** Sending raw base64 encoded images within bulk list API responses causes massive payload bloat and memory pressure on the client.
**Action:** Always filter list queries on the server side (e.g., role-based filtering) to prevent sending unnecessary large string payloads to the client.
