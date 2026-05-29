## 2026-05-23 - [FlatList Performance Optimization]
**Learning:** In React Native, inline array operations (like `.filter()`) passed to a `FlatList`'s `data` prop break reference equality and internal `PureComponent` optimizations, causing unnecessary re-renders.
**Action:** Always wrap derived lists in a `useMemo` hook, `renderItem` functions in `useCallback`, and extract stateless utility functions outside the component scope.

## 2024-05-23 - [Strict Server-Side Filtering of Base64 Payload]
**Learning:** The database schema stores large base64 strings (like `prescriptionImage`) directly in the `requests` table. Fetching all rows unconditionally causes massive API payloads and severe memory/bandwidth bottlenecks.
**Action:** Always use strict database-level filtering (e.g., by `nurseId` or `patientId`) combined with appropriate indices to prevent unconstrained data fetching, rather than downloading everything and filtering on the client.
