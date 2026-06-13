## ADDED Requirements

### Requirement: Display photo masonry grid
The system SHALL display all photos in a responsive masonry grid layout on the portfolio homepage as the primary discovery surface.

#### Scenario: Grid renders with all photos
- **WHEN** user visits the portfolio page
- **THEN** system displays all photos (from albums and standalone) in a masonry grid layout with lazy-loaded images

#### Scenario: Grid is responsive
- **WHEN** viewing on mobile, tablet, or desktop
- **THEN** masonry layout adapts to screen size with appropriate column counts

### Requirement: Filter photos by tags
The system SHALL allow users to filter the masonry grid by tag categories.

#### Scenario: Initial tag display
- **WHEN** user views the portfolio
- **THEN** system displays tag filter options: All, Events, Portraits, Documentary, Street

#### Scenario: Filter by tag
- **WHEN** user clicks a tag filter
- **THEN** system displays only photos with that tag in the masonry grid

#### Scenario: Multiple tag support
The system SHALL support unlimited future tags beyond the initial set.

#### Scenario: Tag inheritance
- **WHEN** filtering photos from albums
- **THEN** system includes both album tags and photo-specific tags in the filter set

### Requirement: Image click opens lightbox
The system SHALL open a lightbox when users click on masonry grid images.

#### Scenario: Click image in grid
- **WHEN** user clicks a photo in the masonry grid
- **THEN** system opens a fullscreen lightbox showing the selected image

### Requirement: Infinite scroll optional behavior
The system MAY support infinite scroll pagination on the masonry grid for performance optimization.

#### Scenario: Pagination support
- **WHEN** user reaches bottom of grid
- **THEN** system MAY load additional photos or implement pagination
