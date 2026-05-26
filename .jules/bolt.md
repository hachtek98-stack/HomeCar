## 2026-05-23 - [FlatList Performance Optimization]
**Learning:** In React Native, inline array operations (like `.filter()`) passed to a `FlatList`'s `data` prop break reference equality and internal `PureComponent` optimizations, causing unnecessary re-renders.
**Action:** Always wrap derived lists in a `useMemo` hook, `renderItem` functions in `useCallback`, and extract stateless utility functions outside the component scope.
## 2024-05-18 - Prevent Massive Payloads via DB Filtering
**Learning:** Sending unfiltered API payloads containing large base64 strings (like `prescriptionImage`) and filtering them locally on the client consumes massive amounts of memory and network bandwidth. In this project, `NurseDashboard` was previously fetching ALL requests and using `useMemo` to filter them locally, which is a major performance anti-pattern.
**Action:** Always implement strict, role-based filtering directly at the database level (e.g., passing `?nurseId=` and adding `WHERE` clauses) and ensure appropriate indices (`CREATE INDEX`) are created on the filtered columns (`status`, `nurseId`) to optimize the query execution before it hits the network.
