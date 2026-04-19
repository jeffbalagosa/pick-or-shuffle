## Why

The app's core pick/shuffle behavior is currently interleaved with DOM lookup, DOM rendering, and browser event wiring. Separating pure app logic from DOM wiring will make behavior easier to test, safer to change, and clearer to extend without changing user-facing workflows.

## What Changes

- Extract parsing, pick, shuffle, remove-picked-item, URL detection, and output modeling into pure JavaScript functions.
- Keep DOM lookup, event listeners, browser paste handling, and element rendering in a thin browser initialization layer.
- Preserve existing Pick mode, Shuffle mode, remove-picked-items, URL-result rendering, and startup behavior.
- Update tests so core behavior can be tested without full DOM setup, while retaining focused integration coverage for browser wiring.

## Capabilities

### New Capabilities
- `app-logic-separation`: Separate pure pick/shuffle decision logic from browser DOM wiring while preserving current behavior.

### Modified Capabilities

## Impact

- Affects [main-script.js](c:/Users/jeffb/Documents/_projects/pick-or-shuffle/main-script.js) by extracting pure logic and reducing direct global DOM coupling.
- Affects [main-script.test.js](c:/Users/jeffb/Documents/_projects/pick-or-shuffle/main-script.test.js) by adding pure unit coverage and keeping focused DOM integration tests.
- May introduce a small additional JavaScript module or export boundary if useful for tests.
- No user-facing UI, dependency, backend, or storage changes are required.
