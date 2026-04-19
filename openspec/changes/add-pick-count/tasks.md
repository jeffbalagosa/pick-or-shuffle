## 1. Failing Tests

- [ ] 1.1 Add failing app logic tests for count normalization, multi-pick count clamping, and no mutation of source arrays.
- [ ] 1.2 Add failing app logic tests for removing multiple picked entries, including duplicate line values.
- [ ] 1.3 Add failing DOM tests for default pick count value and multi-pick output rendering.
- [ ] 1.4 Add failing DOM tests for multi-pick removal and Shuffle Mode ignoring pick count.
- [ ] 1.5 Run the focused failing tests and confirm they fail for the expected missing behavior.

## 2. Selection Logic

- [ ] 2.1 Add a pure pick-count normalization helper that defaults invalid, empty, fractional, or less-than-one counts to `1`.
- [ ] 2.2 Add a pure multi-pick helper that shuffles a copy of the input list and returns up to the normalized count without replacement.
- [ ] 2.3 Add a pure remaining-items helper path that removes one matching source entry for each picked result when removal is enabled.

## 3. Pick Mode UI

- [ ] 3.1 Add a Pick Mode number input to `index.html` with default value `1`, minimum `1`, and whole-number stepping.
- [ ] 3.2 Wire `main-script.js` to read the pick count only for Pick Mode actions.
- [ ] 3.3 Render every picked item in the output list using the existing result rendering path.
- [ ] 3.4 Update Remove Picked Items handling so all picked entries are removed from the textarea after a multi-pick action.
- [ ] 3.5 Ensure Shuffle Mode behavior remains unchanged and does not use pick count.

## 4. Verification

- [ ] 4.1 Run the focused tests again and confirm the new tests pass.
- [ ] 4.2 Run the full Jest test suite and fix any regressions.
- [ ] 4.3 Mark implementation tasks complete only after tests pass.
