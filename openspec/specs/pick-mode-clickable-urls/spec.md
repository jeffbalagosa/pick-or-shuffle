## Purpose
Define Pick Mode input and result behavior for clickable URL outputs while preserving plain-text list editing and Shuffle Mode behavior.

## Requirements

### Requirement: Pick mode SHALL keep a single plain-text input experience
When Pick mode is active, the system SHALL continue to use the existing textarea input as the only visible input surface.

#### Scenario: Pick mode does not show an extra input panel
- **WHEN** the user switches to Pick mode
- **THEN** the textarea remains the only visible input surface

#### Scenario: Input remains editable plain text
- **WHEN** the user enters URL and non-URL lines in Pick mode
- **THEN** the input remains editable plain text

### Requirement: Pick mode SHALL render picked URL results as clickable links
When the selected item in Pick mode is a recognized URL, the output area SHALL render the result as a clickable link instead of plain text.

#### Scenario: Picked URL renders as anchor in output
- **WHEN** the user clicks Pick and the chosen item is an absolute `http` or `https` URL
- **THEN** the output area shows that result as a clickable link

#### Scenario: Picked non-URL renders as plain text in output
- **WHEN** the user clicks Pick and the chosen item is not a recognized URL
- **THEN** the output area shows that result as plain text

### Requirement: Pick mode SHALL preserve existing pick-list behavior while rendering clickable URLs
The system SHALL preserve newline-delimited item parsing and remove-picked-items behavior when clickable URL rendering is enabled.

#### Scenario: Remove picked URL updates the remaining input list
- **WHEN** the user enables Remove Picked Items and a URL entry is picked
- **THEN** the picked URL is removed from the underlying Pick mode textarea list

#### Scenario: Shuffle mode remains unchanged
- **WHEN** the user switches to Shuffle mode
- **THEN** the app continues to use the existing line-based shuffle workflow without requiring clickable URL rendering
