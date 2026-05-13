## 2026-05-13 - [Accessibility: Screen Reader Context for Inputs & Buttons]
**Learning:** In React Native apps, relying solely on `placeholder` attributes for TextInputs is insufficient for screen readers and can lead to lost context once the user starts typing. Furthermore, buttons with implicit roles need clear descriptive hints to guide users on what action will occur.
**Action:** Always pair `TextInput` components with explicit `<Text>` labels linked via `nativeID` and `accessibilityLabelledBy`. Add `accessibilityHint` to clarify the purpose of inputs and buttons.
