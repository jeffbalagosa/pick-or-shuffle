## Context

The current app is a single-page static site with one textarea input, one output list, and a small amount of imperative DOM logic in [main-script.js](c:/Users/jeffb/Documents/_projects/pick-or-shuffle/main-script.js). In Pick mode, the selected item was rendered as a literal `<li>` string, which meant URL items were not interactive.

## Goals / Non-Goals

**Goals:**
- Make picked URL entries directly actionable in Pick mode output.
- Render picked URL results as clickable links in the output area.
- Preserve current Pick mode behaviors, including a single textarea input, random selection, and optional removal of picked items.

**Non-Goals:**
- Rework Shuffle mode into a rich-text experience.
- Add backend persistence, URL validation services, or metadata fetching.
- Support arbitrary HTML input.

## Decisions

1. Keep a single textarea input surface in Pick mode.
   Rationale: user preference is to keep input plain text and avoid an additional input-like preview panel.

   Alternative considered: a Pick-mode rendered input surface for clickable links. Rejected because it introduces duplicate UI and reduces editing clarity.

2. Keep the line-based text model as the source of truth.
   Rationale: existing pick and shuffle logic already depends on newline-delimited entries. Preserving that model minimizes change scope and keeps remove-picked-items behavior straightforward.

   Alternative considered: move to a structured list model stored in DOM nodes. Rejected because it adds state synchronization complexity without improving the random-selection logic.

3. Convert only recognized picked URLs into anchors and leave all other picked values as plain text.
   Rationale: the feature improves URL handling in output without changing how non-URL entries behave. URL detection uses browser URL parsing plus a protocol allowlist such as `http:` and `https:`.

   Alternative considered: auto-link any text that resembles a domain. Rejected because loose matching risks false positives and broken links.

4. Render picked URL results with safe anchor creation instead of string concatenation.
   Rationale: current output rendering uses HTML strings. Building DOM nodes for links avoids mixing escaped text and raw HTML when a picked item is a URL.

## Risks / Trade-offs

- [Users may expect URL auto-linking in input] -> Mitigation: preserve plain-text input by design and provide clickable links in output where action is needed.
- [URL detection may disagree with user expectations for malformed or scheme-less links] -> Mitigation: document and implement a narrow definition of clickable URLs, starting with absolute `http` and `https` URLs.

## Migration Plan

This is a client-only change with no persisted data. Deployment is a static asset update. Rollback is a revert to plain-text-only output rendering.

## Open Questions

- Should scheme-less values such as `www.example.com` remain plain text or be normalized into clickable URLs?
