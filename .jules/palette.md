## 2024-06-11 - React Native TextInput Screen Reader Context
**Learning:** Relying solely on `placeholder` attributes for React Native `TextInput`s is insufficient for screen reader accessibility, as context is lost when typing begins.
**Action:** Always pair inputs with explicit `<Text>` labels linked via `nativeID` and `accessibilityLabelledBy` (or `accessibilityLabel`) to ensure continuous context.
