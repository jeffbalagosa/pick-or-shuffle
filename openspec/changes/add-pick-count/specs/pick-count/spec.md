## ADDED Requirements

### Requirement: Pick Mode SHALL provide a pick count field
The system SHALL provide a numeric Pick Mode field that controls how many items are picked in one Pick action.

#### Scenario: Default pick count is one
- **WHEN** the user opens the app
- **THEN** Pick Mode is selected
- **AND** the pick count field value is `1`

#### Scenario: Pick count field is available in Pick Mode
- **WHEN** Pick Mode is selected
- **THEN** the user can enter a positive whole-number pick count

#### Scenario: Shuffle Mode does not use pick count
- **WHEN** Shuffle Mode is selected
- **THEN** Shuffle Mode continues to shuffle the current list without using the pick count field

### Requirement: Pick Mode SHALL pick the requested number of items
The system SHALL return the requested number of random items for one Pick action, up to the number of available input items.

#### Scenario: User picks multiple items
- **WHEN** Pick Mode is selected
- **AND** the input list contains at least three items
- **AND** the pick count field value is `3`
- **AND** the user clicks Pick
- **THEN** the output area shows three picked items

#### Scenario: Requested count exceeds available items
- **WHEN** Pick Mode is selected
- **AND** the input list contains two items
- **AND** the pick count field value is `5`
- **AND** the user clicks Pick
- **THEN** the output area shows two picked items

#### Scenario: Invalid count falls back to one
- **WHEN** Pick Mode is selected
- **AND** the pick count field value is empty, less than `1`, or not a whole number
- **AND** the user clicks Pick
- **THEN** the output area shows one picked item when the input list is not empty

### Requirement: Pick Mode SHALL preserve removal behavior for multiple picked items
The system SHALL remove every picked list entry from the textarea when Remove Picked Items is enabled.

#### Scenario: Remove multiple picked items
- **WHEN** Pick Mode is selected
- **AND** Remove Picked Items is enabled
- **AND** the input list contains at least four items
- **AND** the pick count field value is `2`
- **AND** the user clicks Pick
- **THEN** the textarea no longer contains the two picked list entries

#### Scenario: Keep source list when removal is disabled
- **WHEN** Pick Mode is selected
- **AND** Remove Picked Items is disabled
- **AND** the pick count field value is greater than `1`
- **AND** the user clicks Pick
- **THEN** the textarea contents remain unchanged

### Requirement: Pick Mode SHALL preserve result rendering for picked URLs
The system SHALL apply existing result rendering behavior to every item picked in a multi-pick action.

#### Scenario: Multiple picked URLs render as clickable links
- **WHEN** Pick Mode is selected
- **AND** multiple picked items are absolute `http` or `https` URLs
- **THEN** each URL result is rendered as a clickable link

#### Scenario: Mixed picked results keep their rendering types
- **WHEN** Pick Mode is selected
- **AND** picked items contain both URL and non-URL values
- **THEN** URL results are rendered as clickable links
- **AND** non-URL results are rendered as plain text
