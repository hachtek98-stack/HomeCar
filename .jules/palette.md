## 2024-05-24 - Add Explicit Text Labels for Accessibility
**Learning:** In React Native, `TextInput` components should be paired with explicit `<Text>` labels linked via `nativeID` and `accessibilityLabelledBy` (or `accessibilityLabel`) to ensure continuous context and screen reader accessibility, as relying solely on `placeholder` is insufficient for assistive technologies.
**Action:** Always include a visual `<Text>` label with a `nativeID` and link it to the corresponding `TextInput` using `accessibilityLabelledBy` to improve form accessibility.
