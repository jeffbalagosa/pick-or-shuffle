## 1. Update Pick mode UI

- [x] 1.1 Keep a single Pick-mode textarea input in [index.html](c:/Users/jeffb/Documents/_projects/pick-or-shuffle/index.html) with no extra visible input panel.
- [x] 1.2 Keep [styles.css](c:/Users/jeffb/Documents/_projects/pick-or-shuffle/styles.css) aligned so Pick mode does not introduce a second visible input box or Shuffle mode layout changes.

## 2. Implement Pick mode URL rendering

- [x] 2.1 Refactor [main-script.js](c:/Users/jeffb/Documents/_projects/pick-or-shuffle/main-script.js) to centralize item parsing and URL detection for Pick mode.
- [x] 2.2 Update Pick mode output rendering so picked `http` and `https` items are created as clickable anchors and non-URL items remain plain text.
- [x] 2.3 Preserve remove-picked-items behavior by updating the underlying textarea value after a URL item is removed.

## 3. Verify behavior

- [x] 3.1 Manually verify that Pick mode keeps a single plain-text input box and Shuffle mode behavior is unchanged.
- [x] 3.2 Manually verify that picked URL results are clickable and that removing a picked URL updates the remaining input list correctly.
