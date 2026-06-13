## ADDED Requirements

### Requirement: Photo content collection
The system SHALL support individual photo resources with comprehensive metadata as base content units.

#### Scenario: Photo can be standalone
- **WHEN** a photo is created without album reference
- **THEN** photo appears in global masonry grid and is independently addressable

#### Scenario: Photo can be part of album
- **WHEN** a photo includes album reference
- **THEN** photo appears in both album collection and global masonry grid

#### Scenario: Photo metadata structure
Photos SHALL have the following metadata fields:
- id: Unique identifier
- title: Photo title
- image: Image file reference
- description: Photo description (optional, required for lightbox display)
- tags: Array of tag categories
- location: Location reference
- date: Capture/publication date
- album: Optional album reference

#### Scenario: Photo is filterable
- **WHEN** user filters by tag
- **THEN** system includes the photo if it matches the tag (including inherited tags from album)

#### Scenario: Photo has lightbox metadata
- **WHEN** user opens photo in lightbox
- **THEN** system displays title, description (mandatory in lightbox), location, and date metadata

### Requirement: Content inheritance from albums
The system SHALL apply inheritance rules for missing photo metadata from parent album.

#### Scenario: Description fallback
- **WHEN** photo has no description
- **THEN** system uses album.description in lightbox display

#### Scenario: Tag merging
- **WHEN** photo has tags and album has tags
- **THEN** system combines album.tags + photo.tags for filtering and display

#### Scenario: Location fallback
- **WHEN** photo has no location
- **THEN** system uses album.location for metadata

#### Scenario: Date fallback
- **WHEN** photo has no date
- **THEN** system uses album.date for metadata
