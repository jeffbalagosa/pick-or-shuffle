## Purpose
Define the initial Pick Mode experience and the behavior for switching between Pick and Shuffle modes.

## Requirements

### Requirement: App SHALL load with Pick mode selected
The system SHALL select Pick mode as the default mode when the app initially loads.

#### Scenario: Initial mode is Pick mode
- **WHEN** the user opens the app
- **THEN** Pick mode is selected

#### Scenario: Shuffle mode is not selected initially
- **WHEN** the user opens the app
- **THEN** Shuffle mode is not selected

### Requirement: App SHALL initialize Pick mode controls on load
The system SHALL initialize mode-dependent controls to match Pick mode when the app initially loads.

#### Scenario: Initial action button picks an item
- **WHEN** the user opens the app
- **THEN** the primary action button is labeled `Pick`

#### Scenario: Remove picked items is initially available
- **WHEN** the user opens the app
- **THEN** the Remove Picked Items checkbox is enabled

#### Scenario: Initial header matches Pick mode
- **WHEN** the user opens the app
- **THEN** the header uses the Pick mode image

### Requirement: App SHALL preserve Shuffle mode switching
The system SHALL keep Shuffle mode available after Pick mode becomes the default.

#### Scenario: User switches to Shuffle mode
- **WHEN** the user selects Shuffle mode
- **THEN** Shuffle mode is selected
- **AND** the primary action button is labeled `Shuffle`
- **AND** the Remove Picked Items checkbox is disabled and unchecked
