## 2024-05-18 - Auth Flow Async Feedback & Input Accessibility
**Learning:** Adding explicit visual feedback (like `ActivityIndicator`) for async login operations and disabling interaction conditionally (e.g. empty input) drastically improves the perceived reliability. Furthermore, adding `accessibilityLabel` to inputs without direct text labels significantly enhances screen reader usability for visually impaired users.
**Action:** Always wrap async actions on primary buttons with loading states and ensure minimal input forms have descriptive accessibility labels.
