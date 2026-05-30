## 2026-05-23 - [FlatList Performance Optimization]
**Learning:** In React Native, inline array operations (like `.filter()`) passed to a `FlatList`'s `data` prop break reference equality and internal `PureComponent` optimizations, causing unnecessary re-renders.
**Action:** Always wrap derived lists in a `useMemo` hook, `renderItem` functions in `useCallback`, and extract stateless utility functions outside the component scope.

## 2026-05-30 - [Database Payload Optimization]
**Learning:** Returning all rows with massive base64 image strings from the database and filtering on the client causes significant memory and network overhead.
**Action:** Always enforce strict server-side filtering combined with appropriate database indices to only transmit necessary rows and prevent large payload transfers.
