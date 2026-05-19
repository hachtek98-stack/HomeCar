## 2026-05-19 - Memoizing FlatList Props
**Learning:** Passing inline derived arrays (e.g., using `.filter()`) directly to a React Native `FlatList`'s `data` prop or inline functions to `renderItem` breaks referential equality on every re-render. This defeats the internal `PureComponent` optimization of `FlatList`, causing unnecessary re-renders of all list items even when data hasn't changed.
**Action:** Always wrap derived lists in a `useMemo` hook, wrap `renderItem` functions in `useCallback`, and extract stateless utility functions outside the component scope.
