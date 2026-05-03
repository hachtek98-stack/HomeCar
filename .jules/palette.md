## 2024-06-25 - React Native Text Input Accessibility
**Learning:** In React Native, `TextInput` components lack native visual labels and can be confusing for screen reader users when only placeholder text is provided. Placeholders alone often fail to offer continuous context.
**Action:** Always pair `TextInput` components with an explicit `<Text>` label. Use the `nativeID` prop on the `<Text>` element and link it to the `TextInput` using the `accessibilityLabelledBy` prop. This ensures both visual clarity and screen reader accessibility, aligning with web accessibility standards for forms.
