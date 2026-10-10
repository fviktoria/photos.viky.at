## Purpose

Frames the homepage as a curated highlights gallery so visitors immediately see a hand-picked selection of the photographer's best work, with tag-based filtering retained for exploration.

## ADDED Requirements

### Requirement: Homepage shows only curated highlights
The homepage SHALL display only the photos explicitly curated in the `portfolio_page` Contentful entry, not all photos from the content library.

#### Scenario: Contentful portfolio_page entry has photos
- **WHEN** the `portfolio_page` entry contains linked photos
- **THEN** the homepage SHALL render exactly those photos in the order they appear in the entry

#### Scenario: No photos in portfolio_page entry
- **WHEN** the `portfolio_page` entry has no linked photos
- **THEN** the homepage SHALL render an empty gallery without error

### Requirement: Tag filter applies to highlighted photos only
The tag filter on the homepage SHALL filter within the curated highlights set, not across the full photo library.

#### Scenario: Visitor selects a tag
- **WHEN** a visitor selects a tag from the filter bar on the homepage
- **THEN** only curated highlight photos that carry that tag SHALL remain visible

#### Scenario: All filter shows full highlights set
- **WHEN** the "All" filter option is selected
- **THEN** all curated highlight photos SHALL be displayed regardless of their tags
