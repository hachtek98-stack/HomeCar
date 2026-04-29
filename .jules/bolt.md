## 2024-05-18 - Avoid Large Un-filtered Payloads
**Learning:** Returning all historical requests without filtering degrades both network performance and client memory usage, particularly when payloads contain large fields like base64 image strings.
**Action:** Always filter API responses on the server side (e.g., using specific query parameters like `nurseId`) to return only the subset of data the client actually needs.
