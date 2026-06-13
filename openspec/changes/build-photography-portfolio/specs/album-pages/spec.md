## ADDED Requirements

### Requirement: Album page routing
The system SHALL generate album pages at dynamic routes.

#### Scenario: Album page URL pattern
- **WHEN** album exists in content
- **THEN** system generates page at /albums/[slug] where slug is the album id

#### Scenario: Album page is static
- **WHEN** site is built
- **THEN** each album generates a static HTML page

### Requirement: Album page layout
The system SHALL display album information with narrative context.

#### Scenario: Album header displays metadata
- **WHEN** user visits album page
- **THEN** system displays album title, description, location, date, and tags prominently

#### Scenario: Album cover image
- **WHEN** album page renders
- **THEN** system displays the cover image specified in album metadata

#### Scenario: Album narrative context
- **WHEN** album page displays
- **THEN** album description appears as narrative context for browsing the collection

### Requirement: Album photo display
The system SHALL display all contained photos on the album page.

#### Scenario: Album contains photos
- **WHEN** photos reference the album in their album field
- **THEN** album page displays all contained photos in masonry grid layout

#### Scenario: Photos maintain metadata
- **WHEN** photos are displayed on album page
- **THEN** each photo retains its individual metadata and remains independently clickable in lightbox

#### Scenario: Photo click opens lightbox
- **WHEN** user clicks a photo on album page
- **WHEN** system opens lightbox with album context preserved

### Requirement: Album navigation
The system SHALL provide navigation context on album pages.

#### Scenario: Breadcrumb navigation
- **WHEN** user is on album page
- **THEN** system displays navigation showing: Portfolio > Album Title

#### Scenario: Link back to portfolio
- **WHEN** user is on album page
- **THEN** system provides link to return to main portfolio grid

### Requirement: Album page SEO
The system SHALL optimize album pages for search engines.

#### Scenario: Album page title
- **WHEN** album page renders
- **THEN** page title includes album title and "Photography" keyword

#### Scenario: Album page metadata
- **WHEN** album page renders
- **THEN** system includes Open Graph, structured data, and location-based SEO tags
