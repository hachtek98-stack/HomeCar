## 2024-05-17 - React Native FlatList Performance - Reference Equality

**Learning:** Inline array operations (like `.filter()`) passed directly to a `FlatList`'s `data` prop break reference equality. This defeats internal `PureComponent` optimizations within `FlatList`, causing unnecessary re-renders of the entire list whenever the parent component re-renders.

**Action:** Always wrap derived lists in a `useMemo` hook, `renderItem` functions in `useCallback`, and extract stateless utility functions outside the component scope to preserve reference equality and ensure `FlatList` renders optimally.
