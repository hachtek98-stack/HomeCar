## 2026-05-23 - [FlatList Performance Optimization]
**Learning:** In React Native, inline array operations (like `.filter()`) passed to a `FlatList`'s `data` prop break reference equality and internal `PureComponent` optimizations, causing unnecessary re-renders.
**Action:** Always wrap derived lists in a `useMemo` hook, `renderItem` functions in `useCallback`, and extract stateless utility functions outside the component scope.

## 2026-05-25 - [Database-Level Filtering for Massive Payloads]
**Learning:** Returning all rows from the database and filtering them in the client (or even in the application layer) is a major performance bottleneck when rows contain massive strings (like base64 `prescriptionImage`). This causes massive network payloads, increased memory usage, and UI stuttering.
**Action:** Always implement strict database-level filtering (e.g., adding `nurseId` to API query parameters and utilizing `WHERE r.nurseId = ?`) and add appropriate database indices (`idx_requests_status_nurse`) before sending data over the network.
