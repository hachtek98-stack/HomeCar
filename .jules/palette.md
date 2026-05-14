
## 2024-05-18 - TextInput Accessibility Enhancement
**Learning:** In React Native, relying exclusively on the `placeholder` prop for text inputs creates an accessibility issue where screen reader users lose context once they begin typing (the placeholder disappears).
**Action:** Always provide an explicit `<Text>` component acting as a label above the `TextInput`. Give the `<Text>` component a `nativeID` and link the `TextInput` to it using the `accessibilityLabelledBy` prop to maintain context at all times.
