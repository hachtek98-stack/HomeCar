## 2026-05-23 - [FlatList Performance Optimization]
**Learning:** In React Native, inline array operations (like `.filter()`) passed to a `FlatList`'s `data` prop break reference equality and internal `PureComponent` optimizations, causing unnecessary re-renders.
**Action:** Always wrap derived lists in a `useMemo` hook, `renderItem` functions in `useCallback`, and extract stateless utility functions outside the component scope.
## 2026-05-24 - [Database Indexing and Strict Payload Filtering]
**Learning:** Storing large base64 images directly in the database (`prescriptionImage`) creates an architectural bottleneck where fetching all rows (even irrelevant ones) leads to massive API response payloads.
**Action:** Always implement strict database-level filtering (e.g., using `WHERE nurseId = ?` and `status`) to avoid returning massive unused payloads, and add corresponding database indexes (`CREATE INDEX`) to prevent full table scans when filtering by those fields.
