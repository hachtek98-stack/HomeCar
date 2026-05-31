## 2026-05-23 - [FlatList Performance Optimization]
**Learning:** In React Native, inline array operations (like `.filter()`) passed to a `FlatList`'s `data` prop break reference equality and internal `PureComponent` optimizations, causing unnecessary re-renders.
**Action:** Always wrap derived lists in a `useMemo` hook, `renderItem` functions in `useCallback`, and extract stateless utility functions outside the component scope.

## 2026-05-31 - [Database Filtering for Large Payloads]
**Learning:** The application stores large base64 strings (`prescriptionImage`) directly in the database. Fetching all requests and filtering them on the client causes massive API payloads and significant network/memory bottlenecks.
**Action:** Always filter data containing large strings or blobs at the database level (e.g., using `WHERE` clauses for `patientId` or `nurseId`) combined with appropriate indices, rather than relying on client-side filtering.
