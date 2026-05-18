## 2024-05-18 - TextInput Accessibility in React Native
**Learning:** Relying solely on `placeholder` attributes for React Native TextInputs is insufficient for screen reader accessibility, as context is lost when typing begins. Explicit `<Text>` labels linked via `nativeID` and `accessibilityLabelledBy` are necessary to ensure continuous context.
**Action:** Always pair `TextInput` components with explicit `<Text>` labels and link them using `nativeID` and `accessibilityLabelledBy` to maintain accessibility for screen reader users.
