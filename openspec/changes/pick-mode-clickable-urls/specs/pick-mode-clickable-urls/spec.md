## ADDED Requirements

### Requirement: Pick mode SHALL present URL entries as clickable links in the input experience
When Pick mode is active, the system SHALL provide an input presentation that preserves the current line-based list and renders recognized URL entries as clickable links.

#### Scenario: URL line is shown as a clickable link in Pick mode
- **WHEN** the user switches to Pick mode with an input line containing an absolute `http` or `https` URL
- **THEN** the Pick mode input experience displays that line as a clickable link

#### Scenario: Non-URL line remains plain text in Pick mode
- **WHEN** the user switches to Pick mode with an input line that is not a recognized URL
- **THEN** the Pick mode input experience displays that line as plain text instead of a link

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
- **THEN** the picked URL is removed from the underlying Pick mode list and no longer appears in the Pick mode input experience

#### Scenario: Shuffle mode remains unchanged
- **WHEN** the user switches to Shuffle mode
- **THEN** the app continues to use the existing line-based shuffle workflow without requiring clickable URL rendering
