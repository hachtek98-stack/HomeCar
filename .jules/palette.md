## 2024-05-15 - Multi-role Authentication Loading States
**Learning:** When multiple distinct login paths exist on a single screen, a generic loading indicator can create ambiguity. Tracking the specific role being authenticated and replacing only that button with a loading indicator, while disabling alternatives, provides much clearer visual feedback.
**Action:** Use a dedicated state variable (like `loadingRole`) instead of a simple boolean (`isLoading`) when multiple mutually exclusive asynchronous actions exist on a screen.
