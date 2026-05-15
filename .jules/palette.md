## 2024-05-15 - Explicit Labels for TextInput in React Native
**Learning:** Relying solely on `placeholder` attributes for React Native `TextInput`s is insufficient for screen reader accessibility, as the context is lost when the user begins typing.
**Action:** Always pair `TextInput` components with an explicit `<Text>` label. Use `nativeID` on the label and link it to the input using `accessibilityLabelledBy`. Add `accessibilityHint` to provide further context on expected interaction.
