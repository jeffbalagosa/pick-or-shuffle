## Context

`main-script.js` currently performs DOM lookup at file load, stores DOM elements in globals, defines app behavior functions, registers browser events, and renders output. Tests therefore need a full JSDOM document even for behavior that does not depend on the browser, such as parsing newline input, selecting an item, shuffling items, removing a picked item, or recognizing URLs.

This change keeps the static app architecture and existing browser behavior, but separates pure decision logic from browser wiring so future behavior changes can be tested directly.

## Goals / Non-Goals

**Goals:**
- Extract core behavior into pure functions that accept explicit inputs and return values without reading or mutating the DOM.
- Keep browser startup explicit through an initialization function that receives the document and randomizer dependency.
- Preserve current Pick mode, Shuffle mode, remove-picked-items, URL-result rendering, paste handling, and mode switching behavior.
- Add unit tests for pure logic and keep focused integration tests for DOM wiring.

**Non-Goals:**
- Changing the UI layout or visual design.
- Replacing Chance.js or changing randomization semantics.
- Introducing a bundler, framework, TypeScript, or new runtime dependency.
- Changing the line-based textarea input model.

## Decisions

- Extract pure logic behind a small module boundary.
  - Rationale: parsing, picking, shuffling, and removal can be tested without DOM setup.
  - Alternative considered: keep functions in `main-script.js` and only export them for tests. Rejected because DOM lookup would still run at file load and keep core logic coupled to browser globals.

- Use dependency injection for random behavior.
  - Rationale: functions can receive `pickone` / `shuffle` behavior or a `chance`-like object, keeping tests deterministic while preserving Chance.js in the browser.
  - Alternative considered: import or read global `chance` inside pure functions. Rejected because it hides dependencies and makes pure tests harder.

- Keep DOM rendering in the browser layer.
  - Rationale: DOM element creation, anchor attributes, `innerHTML` cleanup, and style changes belong with browser concerns, not decision logic.
  - Alternative considered: return HTML strings from pure logic. Rejected because it preserves injection risk and makes URL/plain-text rendering less explicit.

- Keep compatibility with the current static script loading model.
  - Rationale: the app is a small static page and should continue to run without a build step.
  - Alternative considered: convert to ES modules or add bundling now. Rejected because it increases deployment surface beyond the refactor's goal.

## Risks / Trade-offs

- Refactor can accidentally change current browser behavior -> preserve integration tests for startup mode, mode switching, Pick output, Shuffle output, and remove-picked-items behavior.
- Static script compatibility can constrain module shape -> choose a CommonJS/browser-compatible export pattern or a separate pure file loaded before browser wiring.
- Duplicate URL rendering behavior can remain split during extraction -> centralize item output modeling in pure logic and use one DOM renderer for item results.
- More files add small complexity -> keep boundaries narrow and named around current behavior, not speculative abstractions.
