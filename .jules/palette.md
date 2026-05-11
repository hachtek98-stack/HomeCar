
## 2024-05-11 - [Accessibility] TextInput Labels in React Native
**Learning:** React Native `TextInput` components do not have a built-in label prop that visually and semantically links text to the input for screen readers. Using `placeholder` alone is insufficient for accessibility.
**Action:** Always pair `TextInput` with an explicit `<Text>` component. Link them semantically by assigning a `nativeID` to the `<Text>` and passing that ID to the `accessibilityLabelledBy` prop of the `TextInput` to ensure continuous context for screen reader users. Add `accessibilityHint` to provide additional context.
