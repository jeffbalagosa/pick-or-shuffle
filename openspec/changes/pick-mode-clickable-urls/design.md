## Context

The current app is a single-page static site with one textarea input, one output list, and a small amount of imperative DOM logic in [main-script.js](c:/Users/jeffb/Documents/_projects/pick-or-shuffle/main-script.js). In Pick mode, the selected item is rendered as a literal `<li>` string, which means URL items are not interactive. The input surface is currently a native `<textarea>`, which cannot render embedded clickable anchors.

## Goals / Non-Goals

**Goals:**
- Make URL entries directly actionable in Pick mode without changing the existing line-based list model.
- Render picked URL results as clickable links in the output area.
- Preserve current Pick mode behaviors, including random selection and optional removal of picked items.

**Non-Goals:**
- Rework Shuffle mode into a rich-text experience.
- Add backend persistence, URL validation services, or metadata fetching.
- Support arbitrary HTML input.

## Decisions

1. Introduce a Pick-mode-specific rendered input surface.
   Rationale: a native textarea cannot host clickable anchors, so the app needs a separate rendered surface for Pick mode. The simplest approach is to keep a plain-text source of truth and mirror it into a Pick-mode view that renders one line per item, converting URL lines into anchors.

   Alternative considered: keep the existing textarea and attempt to make URLs clickable inside it. Rejected because the browser does not support anchor interaction inside textarea content.

2. Keep the line-based text model as the source of truth.
   Rationale: existing pick and shuffle logic already depends on newline-delimited entries. Preserving that model minimizes change scope and keeps remove-picked-items behavior straightforward.

   Alternative considered: move to a structured list model stored in DOM nodes. Rejected because it adds state synchronization complexity without improving the random-selection logic.

3. Convert only recognized URLs into anchors and leave all other lines as plain text.
   Rationale: the feature should improve URL handling without changing how non-URL entries behave. URL detection can use browser URL parsing plus a protocol allowlist such as `http:` and `https:`.

   Alternative considered: auto-link any text that resembles a domain. Rejected because loose matching risks false positives and broken links.

4. Render picked URL results with safe anchor creation instead of string concatenation.
   Rationale: current output rendering uses HTML strings. Building DOM nodes for links avoids mixing escaped text and raw HTML when a picked item is a URL.

## Risks / Trade-offs

- [Rendered Pick-mode input adds UI complexity] -> Mitigation: scope the rendered surface to Pick mode only and preserve the current plain-text model for parsing and mutation.
- [URL detection may disagree with user expectations for malformed or scheme-less links] -> Mitigation: document and implement a narrow definition of clickable URLs, starting with absolute `http` and `https` URLs.
- [Two synchronized Pick-mode representations can drift] -> Mitigation: centralize line parsing and rendered-view updates in a single helper path.

## Migration Plan

This is a client-only change with no persisted data. Deployment is a static asset update. Rollback is a revert to the existing textarea-only Pick mode and plain-text output rendering.

## Open Questions

- Should the rendered Pick-mode input open links on a normal click or require modified-click behavior while editing?
- Should scheme-less values such as `www.example.com` remain plain text or be normalized into clickable URLs?
