## 2024-05-18 - TextInput Accessibility in React Native
**Learning:** In React Native, relying solely on `placeholder` attributes for `TextInput` accessibility is insufficient, as the placeholder context is lost to screen readers once the user starts typing.
**Action:** Always pair `TextInput` components with explicit `<Text>` labels and link them using `nativeID` and `accessibilityLabelledBy` to ensure continuous context for screen reader users.
