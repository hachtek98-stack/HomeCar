## 2024-05-24 - FlatList Re-render Optimization
**Learning:** In React Native, passing unmemoized arrays (like `requests.filter(...)`) to a `FlatList`'s `data` prop breaks reference equality. This disables internal `PureComponent` optimizations and triggers unnecessary re-renders of the entire list.
**Action:** Always wrap derived lists in `useMemo`, `renderItem` functions in `useCallback`, and extract stateless utility functions outside the component scope.
