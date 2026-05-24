## 2024-05-24 - explicit-text-input-labels
**Learning:** Relying solely on `placeholder` attributes for React Native TextInputs is insufficient for screen reader accessibility, as context is lost when typing begins.
**Action:** Always pair inputs with explicit `<Text>` labels linked via `nativeID` and `accessibilityLabelledBy` (or `accessibilityLabel`) to ensure continuous context and screen reader accessibility.
