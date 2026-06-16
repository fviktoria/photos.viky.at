# photos/

Staging folder for photos before uploading to Contentful. Optimize here first, then upload the file as the `image` asset on a `portfolio_photo` entry.

## Optimization

Resize to max 2500px on the long edge, JPEG quality 85:

```bash
sips -Z 2500 --setProperty formatOptions 85 *.jpg
```

Run from inside this folder. Modifies files in place — keep originals elsewhere if needed.

Target result: portrait images come out at ~1666×2500px, ~700 KB–1.5 MB.

## File naming

```
{category}-{subject}-{YYYYMMDD}-{sequence}.jpg
```

Examples:
- `portrait-headshot-20260508-001.jpg`
- `report-pride-parade-vienna-001.jpg` (no date if album date covers it)

The filename without extension becomes the `slug` field on the Contentful `portfolio_photo` entry, so keep it lowercase, hyphen-separated, no spaces.

Categories in use: `portrait`, `report`
