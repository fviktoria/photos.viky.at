## ADDED Requirements

### Requirement: PhotoSwipe lightbox integration
The system SHALL provide a fullscreen image viewing experience using PhotoSwipe lightbox.

#### Scenario: Lightbox opens on image click
- **WHEN** user clicks an image in masonry grid
- **THEN** system opens PhotoSwipe lightbox displaying the image in fullscreen

#### Scenario: Lightbox displays image metadata
- **WHEN** lightbox is open
- **THEN** system displays photo title, description, and optional location/date metadata

#### Scenario: Description is mandatory in lightbox
Photos SHALL always have descriptions visible in lightbox, with inheritance from album if needed.

#### Scenario: Album context in lightbox
- **WHEN** photo is part of an album
- **THEN** lightbox displays album reference and context information

#### Scenario: Lightbox navigation
- **WHEN** lightbox is open
- **THEN** user can navigate between photos using next/previous controls

#### Scenario: Fullscreen viewing
- **WHEN** lightbox is active
- **THEN** image is displayed at maximum resolution and size available

#### Scenario: Lightbox close behavior
- **WHEN** user closes lightbox (via close button or escape key)
- **THEN** system returns to masonry grid view with scroll position preserved where possible

### Requirement: Metadata display configuration
The system SHALL display optional metadata fields in lightbox when available.

#### Scenario: Location display
- **WHEN** photo has location metadata
- **THEN** system displays location in lightbox UI

#### Scenario: Date display
- **WHEN** photo has date metadata
- **THEN** system displays date in lightbox UI

#### Scenario: EXIF data optional
The system MAY display EXIF metadata (camera, lens, settings) when available.
