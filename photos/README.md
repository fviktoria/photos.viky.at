# photos/

Staging folder for photos before uploading to Contentful.

Use `/sync-to-contentful` to sync to Contentful via MCP. The skill handles both loose photos at the root and album subfolders.

---

## Folder structure

```
photos/
  photos-viky-portrait-headshot-20260508-001.jpg   ← loose photo, no album
  photos-viky-report-pride-parade-vienna-001.jpg   ← loose photo, no album
  pride-parade-vienna-2026/
    album.yaml
    photos-viky-report-pride-parade-vienna-001.jpg
    photos-viky-report-pride-parade-vienna-002.jpg
```

Album subfolders must contain an `album.yaml`. Loose `.jpg` files at the root are uploaded as standalone photos with no album link.

---

## album.yaml

```yaml
title: Pride Parade Vienna 2026           # required
slug: pride-parade-vienna-2026            # required — unique Contentful slug
description: A report from Vienna Pride.  # optional
tags:                                     # optional
  - report
  - pride
location: Vienna, Austria                 # optional
date: 2026-06-14                          # optional (YYYY-MM-DD)
cover: photos-viky-report-pride-parade-vienna-001.jpg # optional — defaults to first photo
```

---

## File naming

```
photos-viky-{category}-{subject}-{YYYYMMDD}-{sequence}.jpg
```

Examples:
- `photos-viky-portrait-headshot-20260508-001.jpg`
- `photos-viky-report-pride-parade-vienna-001.jpg`

The filename without extension becomes the `slug` (and asset title) on the Contentful `portfolio_photo` entry — lowercase, hyphen-separated, no spaces.

`{category}` is also added to the entry's `tags` field, capitalized (e.g. `portrait` → `Portrait`).

Categories in use: `portrait`, `report`

---

## Optimization

The `/sync-to-contentful` skill runs `sips` automatically on each photo before uploading, but only for photos that don't already exist in Contentful:

```bash
sips -Z 2500 --setProperty formatOptions 85 <file>.jpg
```

Max 2500px on the long edge, JPEG quality 85. Modifies files in place — keep originals elsewhere.

Target: portrait images ~1666×2500px, ~700 KB–1.5 MB.
