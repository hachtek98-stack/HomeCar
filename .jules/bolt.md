## 2026-05-23 - [FlatList Performance Optimization]
**Learning:** In React Native, inline array operations (like `.filter()`) passed to a `FlatList`'s `data` prop break reference equality and internal `PureComponent` optimizations, causing unnecessary re-renders.
**Action:** Always wrap derived lists in a `useMemo` hook, `renderItem` functions in `useCallback`, and extract stateless utility functions outside the component scope.
## 2024-05-28 - Backend Database Filtering to Prevent API Payload Bottlenecks
**Learning:** Returning all rows with large base64 string columns (like `prescriptionImage`) causes massive API payload bottlenecks, even if filtering happens on the client.
**Action:** Always filter data at the database layer (e.g., passing `nurseId` to only fetch relevant rows) and ensure appropriate indices (`idx_nurseId`, `idx_status`) are present to optimize the query execution before sending the data over the network.
