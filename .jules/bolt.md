## 2024-06-25 - React Native FlatList Performance Pattern
**Learning:** In React Native, passing dynamically filtered arrays or inline functions directly to a `FlatList` breaks internal `PureComponent` reference equality, causing all items to re-render unnecessarily whenever the parent component updates.
**Action:** Always wrap derived list data in `useMemo` and the `renderItem` function in `useCallback` (providing correct dependency arrays) when rendering `FlatList` components to prevent performance degradation.
