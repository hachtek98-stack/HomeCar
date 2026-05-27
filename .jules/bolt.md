## 2026-05-23 - [FlatList Performance Optimization]
**Learning:** In React Native, inline array operations (like `.filter()`) passed to a `FlatList`'s `data` prop break reference equality and internal `PureComponent` optimizations, causing unnecessary re-renders.
**Action:** Always wrap derived lists in a `useMemo` hook, `renderItem` functions in `useCallback`, and extract stateless utility functions outside the component scope.
## 2024-05-24 - Database-Level Filtering for Large Payloads
**Learning:** Returning large base64 data URIs (e.g., `prescriptionImage`) directly from the database without server-side filtering results in massive API payloads when fetching collections (e.g., all `requests`). Relying on client-side filtering (`Array.prototype.filter`) is highly inefficient and causes slow load times and memory overhead.
**Action:** Always filter results at the database query level (e.g., by `nurseId` or `patientId`) and utilize appropriate database indexes before returning rows containing large TEXT blobs.
