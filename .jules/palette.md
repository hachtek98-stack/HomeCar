## 2024-05-18 - Improve React Native Form Accessibility
**Learning:** In React Native, `TextInput` components do not have implicitly associated labels like HTML `input` elements wrapped in `label` tags. To ensure continuous context and screen reader accessibility, `TextInput` components should be paired with explicit `<Text>` labels linked via `nativeID` and `accessibilityLabelledBy`.
**Action:** Always link form inputs to descriptive text labels using `nativeID` on the label and `accessibilityLabelledBy` on the input to ensure a seamless experience for screen reader users.
