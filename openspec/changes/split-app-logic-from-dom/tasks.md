## 1. Red: Pure Logic Coverage

- [x] 1.1 Add failing unit tests for parsing newline-delimited input with blank lines removed and order preserved.
- [x] 1.2 Add failing unit tests for deterministic pick and shuffle behavior using injected picker/shuffler functions.
- [x] 1.3 Add failing unit tests for remove-picked-items data behavior when removal is enabled and disabled.
- [x] 1.4 Add failing unit tests for URL classification of absolute `http` / `https` URLs and non-URL plain text.

## 2. Extract Core Logic

- [x] 2.1 Create a pure logic module for parsing, pick, shuffle, remove-picked-item, and URL/result classification behavior.
- [x] 2.2 Ensure pure logic functions accept explicit inputs and do not read from or mutate DOM elements.
- [x] 2.3 Inject random picker/shuffler behavior so tests can remain deterministic while browser behavior still uses Chance.js.
- [x] 2.4 Run pure logic tests and confirm they pass.

## 3. Refactor Browser Wiring

- [x] 3.1 Replace direct behavior calculations in `main-script.js` with calls to the pure logic module.
- [x] 3.2 Keep DOM lookup, event registration, paste handling, mode synchronization, and element rendering in the browser layer.
- [x] 3.3 Preserve Pick mode output rendering, including clickable URL results and plain-text non-URL results.
- [x] 3.4 Preserve Shuffle mode output rendering for line-based input.
- [x] 3.5 Preserve Remove Picked Items textarea updates using the remaining list returned by core logic.

## 4. Integration Verification

- [x] 4.1 Keep or update focused JSDOM integration tests for initial Pick mode state and mode switching.
- [x] 4.2 Add or keep integration coverage for Pick, Shuffle, and Remove Picked Items workflows after refactor.
- [x] 4.3 Run the full test suite and confirm all tests pass.
- [x] 4.4 Manually inspect the static page if needed to confirm script loading still works without a build step.
