# Image Directory

This directory contains all portfolio photos served as static assets.

## Naming Convention

Files should follow the pattern:

```
{slug}-{width}w.{ext}
```

Examples:
- `vienna-sunset-001.jpg`
- `portrait-session-2024-002.jpg`

## Rules

- Use lowercase letters, numbers, and hyphens only (no spaces or special characters)
- Use descriptive names that reflect the subject
- JPEG for photographs, PNG only if transparency is required
- Original files can be any resolution; Astro Image handles optimization at build time
- Group by year or project if the collection grows large

## Directory Structure (optional)

For large collections, you may organize into subdirectories:

```
public/images/
  2024/
    event-name-001.jpg
  2025/
    portrait-session-001.jpg
```

Reference images in content frontmatter using the path relative to `public/`:

```yaml
image: /images/event-name-001.jpg
```
