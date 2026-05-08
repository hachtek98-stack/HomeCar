## 2024-05-08 - Added Explicit Text Labels for TextInputs
**Learning:** In React Native, `TextInput` components lack built-in label rendering like web forms. For screen reader accessibility, they must be paired with explicit `<Text>` elements linked via `nativeID` and `accessibilityLabelledBy` to maintain continuous context. Placeholders alone are insufficient.
**Action:** Always include an explicit `<Text>` label associated with a `nativeID` when adding `TextInput` components to improve screen reader compatibility.
