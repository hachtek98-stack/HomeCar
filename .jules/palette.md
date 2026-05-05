## 2024-06-25 - React Native TextInput Labeling
**Learning:** In React Native, `TextInput` components should be paired with explicit `<Text>` labels linked via `nativeID` and `accessibilityLabelledBy` to ensure continuous context and screen reader accessibility. Placeholders alone are insufficient for screen readers or contextual memory.
**Action:** Always include explicitly linked text labels for input components, avoiding rely on placeholders for input semantics.
