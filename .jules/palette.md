## 2024-05-16 - Add explicit Text labels for TextInputs
**Learning:** Relying solely on `placeholder` attributes for React Native TextInputs is insufficient for screen reader accessibility, as context is lost when typing begins.
**Action:** Always pair inputs with explicit `<Text>` labels linked via `nativeID` and `accessibilityLabelledBy` to ensure continuous context and screen reader accessibility. Add `accessibilityLabel` to buttons.
