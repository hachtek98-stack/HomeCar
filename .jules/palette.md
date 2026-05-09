## 2024-05-09 - Accessible TextInput Components in React Native
**Learning:** TextInput components in React Native need explicit `<Text>` labels linked via `nativeID` and `accessibilityLabelledBy` (or `accessibilityLabel`) to ensure continuous context and screen reader accessibility, as placeholders are insufficient.
**Action:** Always pair `TextInput` components with explicit `<Text>` labels using `nativeID` and `accessibilityLabelledBy` to maintain accessibility standards.
