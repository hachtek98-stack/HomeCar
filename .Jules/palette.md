## 2026-04-26 - Added loading state and a11y labels to LoginScreen.js
**Learning:** React Native core components do not automatically announce their states to screen readers. Adding `accessibilityLabel`, `accessibilityHint`, and `accessibilityRole` attributes is crucial for a11y. Swapping UI components (buttons for loaders) can cause layout jumps; reserving space (e.g., `minHeight`) mitigates this jank.
**Action:** When adding loading states that hide interactive elements, always ensure layout stability and add appropriate accessibility tags.
