## Context

The app currently defaults to Shuffle mode through the checked radio button in `index.html`, the initial `Shuffle` button label, disabled remove-picked-items checkbox, and default shuffle header image in `styles.css`. Runtime UI synchronization lives in `enableCheckbox()`, but that function currently runs only after a radio button change event.

This change makes Pick mode the initial state while preserving the existing two-mode UI and the existing Pick and Shuffle workflows.

## Goals / Non-Goals

**Goals:**
- Load the app with Pick mode selected.
- Ensure initial UI state matches Pick mode: `Pick` action label, enabled remove-picked-items checkbox, and pick-mode header image.
- Keep Shuffle mode available and unchanged after users switch modes.
- Update documentation and tests to reflect the new default.

**Non-Goals:**
- Redesigning the mode selector or input/output layout.
- Changing random selection or shuffle behavior.
- Changing Pick mode URL rendering or remove-picked-items semantics.

## Decisions

- Set Pick mode as the source-of-truth initial radio selection in `index.html`.
  - Rationale: the default mode is a document state, so the checked radio belongs in markup.
  - Alternative considered: set the checked state only from JavaScript on load. Rejected because it hides the default from the static document and can leave pre-script UI inconsistent.

- Call the existing mode synchronization path during startup.
  - Rationale: `enableCheckbox()` already owns mode-dependent UI state. Reusing it avoids duplicating assignments for the button label, checkbox state, textarea/input display, and header image.
  - Alternative considered: update static HTML/CSS defaults only. Rejected because future changes to mode-dependent UI would need duplicate maintenance and current CSS still defaults the header to the shuffle image.

- Add focused regression coverage for initial Pick mode state.
  - Rationale: this is a default-state change with user-visible controls; tests should catch accidental reversion to Shuffle mode or partial Pick mode initialization.
  - Alternative considered: rely on manual verification. Rejected because the existing test suite already covers related Pick mode behavior.

## Risks / Trade-offs

- Initial state partially updates if startup synchronization is missed -> add test coverage for selected radio, action label, and remove-picked-items enabled state.
- Shuffle mode may regress while changing defaults -> keep existing change handlers intact and add or preserve coverage for switching back to Shuffle mode.
- Header image may remain shuffle-themed if only markup changes -> ensure startup uses the same path as radio change handling.
