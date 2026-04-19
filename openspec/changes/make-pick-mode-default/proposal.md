## Why

Users who open the app should land directly in Pick mode when the primary workflow is selecting one random item. Making Pick mode the default removes an extra mode switch for that common path while keeping Shuffle mode available.

## What Changes

- Select Pick mode by default on initial page load.
- Initialize the UI controls, action label, header image, and remove-picked-items availability for Pick mode.
- Preserve the ability to switch to Shuffle mode and use the existing shuffle workflow.

## Capabilities

### New Capabilities
- `pick-mode-default`: Make Pick mode the initial default mode while preserving mode switching.

### Modified Capabilities

## Impact

- Affects [index.html](c:/Users/jeffb/Documents/_projects/pick-or-shuffle/index.html) initial radio button state.
- Affects [main-script.js](c:/Users/jeffb/Documents/_projects/pick-or-shuffle/main-script.js) initial UI synchronization if needed.
- Affects [README.md](c:/Users/jeffb/Documents/_projects/pick-or-shuffle/README.md) usage documentation.
- Affects [main-script.test.js](c:/Users/jeffb/Documents/_projects/pick-or-shuffle/main-script.test.js) default-mode coverage.
- No new external dependencies or backend systems are required.
