## 2024-05-24 - explicit-text-input-labels
**Learning:** Relying solely on `placeholder` attributes for React Native TextInputs is insufficient for screen reader accessibility, as context is lost when typing begins.
**Action:** Always pair inputs with explicit `<Text>` labels linked via `nativeID` and `accessibilityLabelledBy` (or `accessibilityLabel`) to ensure continuous context and screen reader accessibility.

## 2026-05-29 - TextInput Placeholder Accessibility in React Native
**Learning:** Placeholders in `TextInput` disappear once the user starts typing, leaving screen reader users without context about what the field is for. Relying solely on `placeholder` is an accessibility anti-pattern in React Native.
**Action:** Always pair `TextInput`s with an explicit `<Text>` component acting as a label. Link them using `nativeID` on the label and `accessibilityLabelledBy` on the input to ensure continuous context throughout the interaction.
