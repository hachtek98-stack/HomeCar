## 2024-05-24 - [LoginScreen Accessibility]
**Learning:** In React Native, connecting a visual `<Text>` label to a `<TextInput>` using `nativeID` and `accessibilityLabelledBy` greatly improves screen reader context, preventing inputs from being announced without clear purpose. Adding an explicit "required" indicator (*) alongside `accessibilityHint` further enhances the predictability for assistive technologies.
**Action:** Always link visual labels to inputs explicitly and provide descriptive `accessibilityLabel` and `accessibilityHint` for role-specific action buttons.
