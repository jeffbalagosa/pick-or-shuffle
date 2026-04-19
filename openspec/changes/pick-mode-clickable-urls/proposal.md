## Why

Pick mode already supports selecting a single item from a line-based list, but URL entries are treated as plain text in the result output. That forces users to copy and paste links instead of opening them directly.

## What Changes

- Render picked URL results as clickable links in the output area while preserving plain text rendering for non-URL items.
- Preserve the existing textarea-based input workflow in Pick mode as plain text (no extra rendered input box).
- Preserve the existing line-based pick workflow, including remove-picked-items behavior.

## Capabilities

### New Capabilities
- `pick-mode-clickable-urls`: Make picked URL entries clickable in Pick mode output results.

### Modified Capabilities

## Impact

- Affects [index.html](c:/Users/jeffb/Documents/_projects/pick-or-shuffle/index.html) Pick mode input/output markup.
- Affects [main-script.js](c:/Users/jeffb/Documents/_projects/pick-or-shuffle/main-script.js) pick-mode parsing and output DOM rendering.
- Affects [styles.css](c:/Users/jeffb/Documents/_projects/pick-or-shuffle/styles.css) styling for clickable links in output.
- No new backend systems or external dependencies are required.
