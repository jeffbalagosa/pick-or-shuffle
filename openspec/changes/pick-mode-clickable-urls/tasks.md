## 1. Update Pick mode UI

- [x] 1.1 Add a Pick-mode input presentation in [index.html](c:/Users/jeffb/Documents/_projects/pick-or-shuffle/index.html) that can show newline-delimited items and render URL entries as clickable links.
- [x] 1.2 Add styles in [styles.css](c:/Users/jeffb/Documents/_projects/pick-or-shuffle/styles.css) for Pick-mode link rendering in the input and output areas without changing Shuffle mode layout.

## 2. Implement Pick mode URL rendering

- [x] 2.1 Refactor [main-script.js](c:/Users/jeffb/Documents/_projects/pick-or-shuffle/main-script.js) to centralize item parsing and URL detection for Pick mode.
- [x] 2.2 Update Pick mode output rendering so picked `http` and `https` items are created as clickable anchors and non-URL items remain plain text.
- [x] 2.3 Preserve remove-picked-items behavior by updating both the underlying text value and the Pick-mode rendered input after a URL item is removed.

## 3. Verify behavior

- [ ] 3.1 Manually verify that URL lines are clickable in Pick mode input, non-URL lines stay plain text, and Shuffle mode behavior is unchanged.
- [ ] 3.2 Manually verify that picked URL results are clickable and that removing a picked URL updates the remaining input list correctly.
