## 2024-05-16 - FlatList optimization via useMemo and useCallback
**Learning:** Inline array operations passed to a `FlatList`'s `data` prop (like `.filter()`) break reference equality and internal `PureComponent` optimizations in React Native, causing unnecessary re-renders. Similarly, inline functions passed to `renderItem` will cause child items to re-render.
**Action:** Always wrap derived lists in a `useMemo` hook, wrap `renderItem` functions in `useCallback`, and extract stateless utility functions outside the component scope.
