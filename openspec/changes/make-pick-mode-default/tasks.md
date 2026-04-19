## 1. Initial Default State

- [ ] 1.1 Update `index.html` so Pick mode is checked by default and Shuffle mode is unchecked.
- [ ] 1.2 Initialize mode-dependent UI on startup by invoking the existing mode synchronization logic after event listeners are registered.
- [ ] 1.3 Ensure startup Pick mode state shows the `Pick` action label, enables Remove Picked Items, keeps the textarea visible, hides the input display, and uses the Pick mode header image.

## 2. Shuffle Mode Preservation

- [ ] 2.1 Verify switching to Shuffle mode still sets the `Shuffle` action label.
- [ ] 2.2 Verify switching to Shuffle mode disables and unchecks Remove Picked Items.
- [ ] 2.3 Verify switching back to Pick mode restores Pick mode controls.

## 3. Tests and Documentation

- [ ] 3.1 Add regression tests for initial Pick mode selection and initial Pick mode control state.
- [ ] 3.2 Add regression tests for switching from default Pick mode to Shuffle mode.
- [ ] 3.3 Update README usage text to describe Pick mode as the default and keep Shuffle mode instructions accurate.
- [ ] 3.4 Run the test suite and confirm all tests pass.
