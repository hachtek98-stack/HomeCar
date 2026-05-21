## 2026-05-21 - TextInput Accessibility in React Native
**Learning:** Relying solely on `placeholder` props for `TextInput` components in React Native provides poor accessibility because the context is lost for screen readers as soon as the user starts typing.
**Action:** Always pair `TextInput` components with explicit `<Text>` labels, linking them using the `nativeID` prop on the label and the `accessibilityLabelledBy` prop on the input. Use placeholders only for examples, not as primary labels.
