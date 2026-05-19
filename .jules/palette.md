## 2024-03-24 - TextInput Accessibility in React Native
**Learning:** Relying solely on `placeholder` attributes for React Native `TextInput`s is insufficient for screen reader accessibility, as context is lost when typing begins.
**Action:** Always pair inputs with explicit `<Text>` labels linked via `nativeID` and `accessibilityLabelledBy` (or `accessibilityLabel`) and include `accessibilityHint`s to ensure continuous context.
