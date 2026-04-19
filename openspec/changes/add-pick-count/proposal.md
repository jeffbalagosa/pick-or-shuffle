## Why

Pick Mode currently returns one random item per click. Users who need several choices from the same list must click repeatedly and cannot request a batch in one action.

## What Changes

- Add a numeric Pick Mode control for how many items to pick from the list.
- Default the pick count to `1`.
- Use the requested count when Pick Mode runs.
- Preserve existing Shuffle Mode behavior.
- Preserve Remove Picked Items behavior by removing all picked items when that option is enabled.

## Capabilities

### New Capabilities
- `pick-count`: Pick Mode can accept a requested count and return that many picked items from the current list.

### Modified Capabilities

## Impact

- Affects Pick Mode form markup in `index.html`.
- Affects Pick Mode event handling and rendering in `main-script.js`.
- Affects selection logic in `app-logic.js`.
- Requires focused unit coverage for default count, multi-pick output, count limits, and remove-picked-items updates.
