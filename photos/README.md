# photos/

Staging folder for photos before uploading to Contentful.

Use `/sync-to-contentful` to sync to Contentful via MCP. The skill handles both loose photos at the root and album subfolders.

---

## Folder structure

```
photos/
  viktoria-ferstl_portrait_2026-10_01.jpeg         ← loose photo, no album
  pride-parade-vienna-2026/
    album.yaml
    viktoria-ferstl_report_2026-06-14_01.jpeg
    viktoria-ferstl_report_2026-06-14_02.jpeg
```

Album subfolders must contain an `album.yaml`. Loose `.jpg` / `.jpeg` files at the root are uploaded as standalone photos with no album link.

---

## album.yaml

```yaml
title: Pride Parade Vienna 2026           # required
slug: pride-parade-vienna-2026            # required — unique Contentful slug
description: A report from Vienna Pride.  # optional
tags:                                     # optional — slugs of portfolio_tag entries
  - report
  - pride
location: Vienna, Austria                 # optional
date: 2026-06-14                          # optional (YYYY-MM-DD)
cover: viktoria-ferstl_report_2026-06-14_01.jpeg # optional — defaults to first photo
```

---

## File naming

**Current:**
```
viktoria-ferstl_{tag}_{YYYY-MM[-DD]}_{sequence}.jpeg
```

Examples:
- `viktoria-ferstl_baptism_2026-10_01.jpeg`
- `viktoria-ferstl_portrait_2026-10-05_01.jpeg`

**Legacy (still accepted):**
```
photos-viky-{category}-{subject}-{YYYYMMDD}-{sequence}.jpg
```

The filename without extension becomes the `slug` (and asset title) on the Contentful `portfolio_photo` entry.

`{tag}` (current) or `{category}` (legacy) is resolved to a `portfolio_tag` entry in Contentful and linked via `tagRefs`. A new `portfolio_tag` is created automatically if it doesn't already exist.

Tags in use: `baptism`, `portrait`, `report`

---

## Optimization

The `/sync-to-contentful` skill runs `sips` automatically on each photo before uploading, but only for photos that don't already exist in Contentful:

```bash
sips -Z 2500 --setProperty formatOptions 85 <file>.jpeg
```

Max 2500px on the long edge, JPEG quality 85. Modifies files in place — keep originals elsewhere.

Target: portrait images ~1666×2500px, ~700 KB–1.5 MB.
