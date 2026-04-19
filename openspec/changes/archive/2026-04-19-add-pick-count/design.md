## Context

Pick Mode currently parses newline-delimited items, picks one random item, and renders one result. Remove Picked Items can then remove that one chosen item from the textarea. The UI already defaults to Pick Mode, and Shuffle Mode uses the same textarea but has separate behavior.

This change adds a Pick Mode-only numeric control so users can request a batch of picked items in one action. The default must preserve current behavior by picking one item.

## Goals / Non-Goals

**Goals:**
- Add a visible Pick Mode count field with a default value of `1`.
- Use the count to render multiple picked results from one Pick action.
- Keep each batch selection bounded to available input items.
- Remove all picked items from the textarea when Remove Picked Items is enabled.
- Keep Shuffle Mode unchanged.

**Non-Goals:**
- Do not add weighted picking, saved lists, or history.
- Do not change newline parsing.
- Do not change URL link detection or rendering behavior.
- Do not introduce new dependencies.

## Decisions

- Follow test-driven development for this change.
  - Rationale: The behavior is small but has important edge cases around count validation, batch selection, duplicate entries, and DOM integration. Writing failing tests first keeps the implementation scoped to observable behavior.
  - Alternative considered: Implement first and backfill tests. Rejected because count normalization and duplicate removal rules are easy to encode incorrectly without executable examples.

- Use a number input with `min="1"`, `step="1"`, and value `1`.
  - Rationale: Browser-native validation and mobile numeric keyboards fit this simple count.
  - Alternative considered: Free-text count parsing. Rejected because it adds avoidable validation states.

- Add pure selection logic in `app-logic.js` for picking multiple items.
  - Rationale: Current tests already separate pure logic from DOM behavior, and multi-pick needs deterministic unit coverage.
  - Alternative considered: Loop in `main-script.js` and call `pickItem` repeatedly. Rejected because repeated independent picks can duplicate entries within one batch and spreads selection rules into DOM code.

- Pick a batch without replacement by shuffling a copy of the input and taking the requested count.
  - Rationale: "Pick N out of the list" implies one action chooses distinct list entries. Duplicate input lines still remain distinct entries.
  - Alternative considered: Allow duplicate picks inside one batch when Remove Picked Items is unchecked. Rejected because it can return fewer useful choices than requested and is surprising for batch selection.

- Clamp the effective count to the number of available items.
  - Rationale: Asking for more items than exist should return all available items without errors or blank results.
  - Alternative considered: Block the action until the user lowers the count. Rejected because it adds friction for a small app and does not improve data integrity.

## Risks / Trade-offs

- Count validation differs across browsers -> Normalize count in app logic before selection.
- Duplicate lines are ambiguous in removal -> Treat each picked result as one list entry and remove one matching occurrence per picked item.
- Hidden Pick Mode controls can confuse Shuffle Mode users -> Show the count control only when Pick Mode is active, or disable it when Shuffle Mode is active if preserving layout is easier.
