## 2026-05-23 - [FlatList Performance Optimization]
**Learning:** In React Native, inline array operations (like `.filter()`) passed to a `FlatList`'s `data` prop break reference equality and internal `PureComponent` optimizations, causing unnecessary re-renders.
**Action:** Always wrap derived lists in a `useMemo` hook, `renderItem` functions in `useCallback`, and extract stateless utility functions outside the component scope.
