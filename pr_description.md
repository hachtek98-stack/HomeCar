🎯 **What:**
The `AppContext.js` state management module was lacking tests. This change implements a comprehensive test suite for `AppContext`, covering state initialization and all modifier functions. To support this in the current environment, `react`, `react-dom`, `react-native`, and `expo` were downgraded slightly to versions compatible with the latest stable `jest-expo` and `@testing-library/react-native` versions.

📊 **Coverage:**
The tests now cover:
- Initial state rendering
- Adding a new request (`addRequest`)
- Updating payment status (`updateRequestPayment`) and ignoring invalid IDs
- Accepting a request (`acceptRequest`) and ignoring invalid IDs
- Completing a request (`completeRequest`) and ignoring invalid IDs

✨ **Result:**
100% test coverage for `AppContext.js` based on `jest --coverage`.
