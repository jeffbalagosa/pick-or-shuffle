## Why

Pick mode already supports selecting a single item from a line-based list, but URL entries are treated as plain text. That forces users to copy and paste links instead of opening them directly, and the current textarea-based input does not provide any clickable URL behavior in the editing surface.

## What Changes

- Add a Pick mode URL presentation capability that renders URL entries as clickable links in the pick-specific input experience.
- Render picked URL results as clickable links in the output area while preserving plain text rendering for non-URL items.
- Preserve the existing line-based pick workflow, including remove-picked-items behavior, while updating the input UI to support clickable URL entries.

## Capabilities

### New Capabilities
- `pick-mode-clickable-urls`: Make URL entries clickable in the Pick mode input experience and in Pick mode output results.

### Modified Capabilities

## Impact

- Affects [index.html](c:/Users/jeffb/Documents/_projects/pick-or-shuffle/index.html) input/output markup for Pick mode.
- Affects [main-script.js](c:/Users/jeffb/Documents/_projects/pick-or-shuffle/main-script.js) pick-mode parsing and DOM rendering.
- Affects [styles.css](c:/Users/jeffb/Documents/_projects/pick-or-shuffle/styles.css) styling for clickable links and any Pick mode input-state adjustments.
- No new backend systems or external dependencies are required.
