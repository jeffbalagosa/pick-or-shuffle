## Purpose
Define separation between pure list logic and browser DOM wiring so core parsing, selection, shuffling, removal, and result classification can be tested without DOM state.

## Requirements

### Requirement: Core list behavior SHALL be isolated from browser DOM state
The system SHALL provide core list behavior through pure functions that do not read from or write to browser DOM elements.

#### Scenario: Parse line-based input without DOM access
- **WHEN** core logic receives newline-delimited text containing blank lines
- **THEN** it returns only non-empty line items in their original order

#### Scenario: Pick item without DOM access
- **WHEN** core logic receives a list of items and a deterministic item picker
- **THEN** it returns the picked item without reading or mutating DOM state

#### Scenario: Shuffle items without DOM access
- **WHEN** core logic receives a list of items and a deterministic shuffler
- **THEN** it returns the shuffled items without reading or mutating DOM state

### Requirement: Remove-picked-items behavior SHALL be represented as data
The system SHALL calculate the remaining item list for remove-picked-items behavior without directly updating the textarea.

#### Scenario: Remove picked item from remaining items
- **WHEN** remove-picked-items is enabled and an item has been picked from the parsed list
- **THEN** core logic returns a remaining list with one matching picked item removed

#### Scenario: Preserve list when removal is disabled
- **WHEN** remove-picked-items is disabled and an item has been picked from the parsed list
- **THEN** core logic returns the original parsed list unchanged

### Requirement: Result rendering decisions SHALL be separated from DOM rendering
The system SHALL decide whether an item is a clickable URL independently from creating DOM nodes.

#### Scenario: Recognize absolute HTTP URL
- **WHEN** core logic receives an item that is an absolute `http` or `https` URL
- **THEN** it marks the item as linkable

#### Scenario: Preserve non-URL item as plain text
- **WHEN** core logic receives an item that is not an absolute `http` or `https` URL
- **THEN** it marks the item as plain text

### Requirement: Browser wiring SHALL preserve existing user workflows
The system SHALL keep the existing browser UI behavior while delegating core decisions to isolated logic.

#### Scenario: Pick mode result remains user-visible
- **WHEN** the user enters items and clicks Pick
- **THEN** the browser layer renders the selected item in the output list

#### Scenario: Shuffle mode result remains user-visible
- **WHEN** the user enters items and clicks Shuffle
- **THEN** the browser layer renders the shuffled items in the output list

#### Scenario: Remove picked items updates textarea
- **WHEN** the user enables Remove Picked Items and clicks Pick
- **THEN** the browser layer updates the textarea with the remaining items returned by core logic
