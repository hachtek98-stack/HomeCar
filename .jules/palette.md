## 2024-05-24 - Explicit Text Labels for TextInputs in React Native
**Learning:** In React Native, relying solely on placeholder text for `TextInput` fields is insufficient for screen readers. Explicit `<Text>` labels linked via `nativeID` and `accessibilityLabelledBy` are required to ensure continuous context and robust accessibility, just as `<label>` tags are used in web development.
**Action:** When adding or reviewing form inputs in React Native, always ensure there is a descriptive, visible `<Text>` component paired with the `TextInput` using proper accessibility attributes.
