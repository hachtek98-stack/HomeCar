## 2024-04-30 - Form Accessibility Labels
**Learning:** In React Native, relying solely on `placeholder` for text inputs provides poor context for screen readers and disappears when the user starts typing, degrading UX for all users.
**Action:** Always pair `TextInput` with a visible `Text` label and link them using `nativeID` and `accessibilityLabelledBy` (or explicitly set `accessibilityLabel`) to ensure continuous context and a11y support.
