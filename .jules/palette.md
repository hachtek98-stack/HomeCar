## 2024-05-30 - Accessible Text Inputs in React Native
**Learning:** Relying solely on `placeholder` attributes for React Native `TextInput`s is insufficient for screen reader accessibility, as the context is lost when the user begins typing and the placeholder disappears.
**Action:** Always pair `TextInput` components with explicit `<Text>` labels. Link them using `nativeID` on the label and `accessibilityLabelledBy` on the input to ensure continuous context and robust screen reader support.
