## 1. Red: Failing Tests

- [x] 1.1 Add failing regression tests for initial Pick mode selection and Shuffle mode being unselected.
- [x] 1.2 Add failing regression tests for initial Pick mode controls: `Pick` action label, Remove Picked Items enabled, textarea visible, input display hidden, and Pick mode header image.
- [x] 1.3 Add failing regression tests for switching from default Pick mode to Shuffle mode.
- [x] 1.4 Run the targeted test suite and confirm the new tests fail for the expected default-mode assertions.

## 2. Green: Implementation

- [x] 2.1 Update `index.html` so Pick mode is checked by default and Shuffle mode is unchecked.
- [x] 2.2 Initialize mode-dependent UI on startup by invoking the existing mode synchronization logic after event listeners are registered.
- [x] 2.3 Ensure startup Pick mode state shows the `Pick` action label, enables Remove Picked Items, keeps the textarea visible, hides the input display, and uses the Pick mode header image.
- [x] 2.4 Verify switching to Shuffle mode still sets the `Shuffle` action label and disables and unchecks Remove Picked Items.
- [x] 2.5 Verify switching back to Pick mode restores Pick mode controls.
- [x] 2.6 Run the targeted test suite and confirm the new tests pass.

## 3. Refactor and Documentation

- [x] 3.1 Refactor only if the passing implementation has avoidable duplication or unclear startup synchronization.
- [x] 3.2 Update README usage text to describe Pick mode as the default and keep Shuffle mode instructions accurate.
- [x] 3.3 Run the full test suite and confirm all tests pass.
